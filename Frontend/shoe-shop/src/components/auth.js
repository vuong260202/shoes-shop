import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import '../style/Signup.css';
import FetchData from './FetchData';

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    FetchData.login({
      username,
      password
    }).then((response)=>{
        const res = response
        console.log(res)
      if (res.status === 200) {
        setErrorMessage('')
        
        localStorage.setItem("token", res.data.data.token);
        console.log('Login successful:');
        navigate('/Home')
      } else {
        console.log('Login failed');
        setErrorMessage(res.data.message);
      }
    })
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form className="login-form" name="login"
        labelCol={{ span: 8, }}
        wrapperCol={{ span: 16, }}

        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input onChange={(e) => setUsername(e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item>

        {errorMessage && (
        <div style={{ color: 'red', marginLeft: '30%' }}>{errorMessage}</div>
        )}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = async () => {
      try {
        FetchData.signup({
          username,
          password,
          email,
          fullname,
        }).then((res) => {
          if (res.status === 200) {
            setErrorMessage('')
            console.log('Signup successful');
            navigate('/auth/login')
          } else {
            console.log('Signup failed');
            setErrorMessage(res.data.message);
          }
        })        
      } catch (error) {
          console.error('Error during login:', error);
          setErrorMessage(error.response.data.message);
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

export default {Login, Signup};