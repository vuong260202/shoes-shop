import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../style/Index.css';

const Index = () => {
  const navigate = useNavigate()
  if (localStorage.getItem('token') !== 'null') {
    // console.log("abcasd", localStorage.getItem('token') !== null);
    return <Navigate to='/home'/>
  }

  return (
    <div className='div-container'>
      <img src='img/logo.jpg' alt='logo' style={{
        width: '400px',
      }}></img>
      <h2>Welcome to shoe store</h2>
      <button onClick={() => {navigate('/auth/login')}}>Login</button>
      <button onClick={() => {navigate('/auth/signup')}}>Signup</button>
    </div>
  );
};

export default Index;
