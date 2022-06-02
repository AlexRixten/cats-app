import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { addCatItemAction } from './redux/reducer/catReducer';
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
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (fetching) {
      axios.get(`https://api.thecatapi.com/v1/images/search?limit=2&page=${currentPage}`)
        .then((response) => {
          console.log(response)
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


  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
  // })

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && catCard.length < totalCount) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if(catsList.length === 0){
      if(localStorage.getItem('cats') !== null){
        if(JSON.parse(localStorage.getItem('cats')).length === 1){
          localStorage.removeItem('cats');
        }
        else{
          dispatch(addCatItemAction(JSON.parse(localStorage.getItem('cats'))))
        }
      }
      // else{
      //   localStorage.removeItem('cats');
      //   localStorage.setItem('cats', JSON.stringify([]))
      // }
    }
    if (catsList.length !== 0) {
      localStorage.setItem('cats', JSON.stringify(catsList))
    }
  }, [catsList])

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainPage catCard={catCard} error={error} />} />
          <Route path='/lovely' element={<Lovely catCard={catCard} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
