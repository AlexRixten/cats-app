import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { addCatItemAction } from './redux/reducer/catReducer';
import MainPage from './components/MainPage';
import { Lovely } from './components/Lovely';
import Navbar from './components/NavBar';

import './App.css';

function App() {

  const catsList = useSelector(state => state.app.catsList)

  const [catCard, setCatCard] = useState()
  const dispatch = useDispatch()


  const [error, setError] = useState(null)

  
  useEffect(() => {
      axios.get(`https://api.thecatapi.com/v1/images/search?limit=15`)
      .then((response) => {
          console.log(response)
          setCatCard(response?.data);
      }).catch(error => {
          setError(error);
        });
    }, []);

    useEffect(() => {
      
    },[])

    useEffect(() => {
      if(catsList.length !== 0){
        localStorage.setItem('cats', JSON.stringify(catsList))
      }
  }, [catsList])

  // useEffect(() => {
  //   dispatch(addCatItemAction(JSON.parse(localStorage.getItem('cats') || [])))
  // },[])


  console.log(catsList)

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/cats' element={<MainPage catCard={catCard} error={error} />} />
          <Route path='/lovely' element={<Lovely catCard={catCard} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
