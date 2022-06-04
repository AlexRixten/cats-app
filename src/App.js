import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Context } from './components/useContext';
import { addCatItemAction, deleteCatItemAction } from './redux/reducer/catReducer';
import MainPage from './components/MainPage';
import { Lovely } from './components/Lovely';
import Navbar from './components/NavBar';

import './App.css';

function App() {

  const catsList = useSelector(state => state.app.catsList)

  const [catCard, setCatCard] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  // const [like, setLike] = useState(false)
  const [error, setError] = useState(null)

  const MainPageWrapper = document.getElementById('cat__wrapper');

  const dispatch = useDispatch()

  useEffect(() => {
    if (fetching) {
      axios.get(`https://api.thecatapi.com/v1/images/search?limit=30&page=${currentPage}`)
        .then((response) => {
          // console.log(response)
          setCatCard([...catCard, ...response?.data]);
          setTotalCount(response?.headers['content-length'])
          setCurrentPage(prevState => prevState + 1)
        }).catch(error => {
          setError(error);
        }).finally(() => {
          setFetching(false)
        });
    }
  }, [fetching]);


  useEffect(() => {
    if (MainPageWrapper) {
      document.addEventListener('scroll', scrollHandler)
      return function () {
        document.removeEventListener('scroll', scrollHandler)
      }
    }
  })

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && catCard.length < totalCount) {
      setFetching(true)
    }
  }

  useEffect(() => {
    Object.keys(catCard).map(item => {
      if (catCard[item].love === undefined) {
        catCard[item].love = false
      }
    })
  }, [catCard])

  // useEffect(() => {
  //   if(catsList.length === 0){
  //     if(localStorage.getItem('cats') !== null){
  //       if(JSON.parse(localStorage.getItem('cats')).length === 1){
  //         localStorage.removeItem('cats');
  //       }
  //       else{
  //         dispatch(addCatItemAction(JSON.parse(localStorage.getItem('cats'))))
  //       }
  //     }
  //   }
  //   if (catsList.length !== 0) {
  //     localStorage.setItem('cats', JSON.stringify(catsList))
  //   }
  // }, [catsList])

  useEffect(() => {
    if (localStorage.getItem('cats') == null) {
      localStorage.setItem('cats', JSON.stringify([]))
    }
    dispatch(addCatItemAction(JSON.parse(localStorage.getItem('cats'))))
  }, [])

  useEffect(() => {
    localStorage.setItem('cats', JSON.stringify(catsList))
  }, [catsList])

  const toggleLike = id => {
    Object.keys(catCard).map(key => {
      if (catCard[key].id === id) {
        if (!catCard[key].love) {
          catCard[key].love = true
          dispatch(addCatItemAction([{ ...catCard[key] }]))
          return
        }
        if (catCard[key].love) {
          catCard[key].love = false
          dispatch(deleteCatItemAction(catCard[key].id))
          return
        }
      }
    })
    Object.keys(catsList).map(key => {
      if (catsList[key].id === id) {
        dispatch(deleteCatItemAction(catsList[key].id))
        return
      }
    })
  }

  return (
    <Context.Provider value={{ toggleLike }}>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainPage catCard={catCard} error={error} />} />
          <Route path='/lovely' element={<Lovely/>} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
