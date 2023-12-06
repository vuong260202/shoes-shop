import {
  Form
} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Signup.css';

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username,
        password,
        email,
        fullname,
      });
  
      if (response.status === 200) {
        setErrorMessage('')
        console.log('Signup successful');
        navigate('/auth/login')
      } else {
        console.log('Login failed');
        setErrorMessage(response.data.message);
      }
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage(error.response.data.message);
      // }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Form labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // disabled={componentDisabled}
          style={{
            maxWidth: 600,
          }}>
          <Form.Item label="username">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="email">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Họ&Tên">
            <input
              type="text"
              placeholder="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Item>
        </Form>
      <button onClick={handleLogin}>Signup</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
