import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
  
      if (response.status === 200) {
        setErrorMessage('')
        
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        console.log('Login successful:');
        navigate('/Home')
      } else {
        console.log('Login failed');
        setErrorMessage(response.data.message);
      }
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage(error.response.data.message);
    }
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

export default Login;