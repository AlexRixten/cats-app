import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import { Lovely } from './components/Lovely';
import Navbar from './components/NavBar';

import './App.css';

function App(props) {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/cats' element={<MainPage />} />
          <Route path='/lovely' element={<Lovely />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
