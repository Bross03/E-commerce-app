
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

function App() {

  return (
      <div className="App">
        <body>
          <Routes>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>

          </Routes>
        </body>
      </div>
    
  );
}

export default App;
