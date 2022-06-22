
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProductInfo from './Components/ProductInfo/ProductInfo';

function App() {

  return (
      <div className="App">
        <body>
          <Routes>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>
            <Route path='products/:productId' element={<ProductInfo/>}/>
            
          </Routes>
        </body>
      </div>
    
  );
}

export default App;
