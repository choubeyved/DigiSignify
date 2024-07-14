import React from 'react';
import { Draw } from './components/SignaturePad';
import { Type } from './components/TypedSign';
import { Header } from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Landing } from './Pages/LandingPage';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';


export const App: React.FC = () => {
  const location = useLocation();

  const shouldDisplayHeader = () => {
    return location.pathname !== "/login" && location.pathname !== "/signup" ;
  };
  return (
    <>
     {shouldDisplayHeader() && <Header />}
      <Routes>

        <Route path='/draw' element={<Draw/>}/>
        <Route path='/type' element={<Type/>} />
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        
      </Routes>
    </>

  );
};



