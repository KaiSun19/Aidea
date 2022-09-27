import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import LandingPage from './Components/LandingPage';
import {useUser} from "./Context";
import Profile from './Components/Profile';

function App() {

  // const {user} = useUser();
  
  return (

    <div className="App">

      <BrowserRouter>

      {/* {user &&  */}

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path= '/profile' element={<Profile />} /> 

        </Routes>

      </BrowserRouter>

  
    </div>

  );
}

export default App;
