import { Dropdown, Space } from 'antd';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';

const Header = ({onSearch}) => {
  const navigate = useNavigate()
  const [value, setValue] = useState("");

  const items = null;
  
  const checkUserRole = async () => {
    try {
      // Gọi API để lấy vai trò của người dùng từ backend
      const response = await axios.get('localhost:3000/auth/get-role');
      console.log(response);

      console.log(response, response.data, response.data.role);
      const userRole = response.data.role;
  
      if (userRole === 'admin') {
        items = [
          {
            label: ( <a onClick={handleProfile}> giao dịch chờ xử lý </a> ),
            key: '0',
          },
          {
            label: ( <a onClick={handlePassword}> Đổi mật khẩu </a> ),
            key: '4',
          },
          {
            label: ( <a onClick={handleLogout}> Thoát </a> ),
            key: '5',
          },
        ];
      } else {
        items = [
          // {
          //   label: ( <a onClick={handleProfile}> Thông tin cá nhân </a> ),
          //   key: '0',
          // },
          {
            label: ( <a onClick={handlePassword}> Đổi mật khẩu </a> ),
            key: '4',
          },
          {
            label: ( <a onClick={handleLogout}> Thoát </a> ),
            key: '5',
          },
        ];
      }

      return items
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('token', 'null');
    navigate('/')
  };

  const handleProfile = () => {
    navigate('/auth/profile')
  };

  const handlePassword = () => {
    navigate('/auth/set-password')
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(value)
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <a href={`/home`}>
          <img src='http://localhost:3001/img/logo.jpg' alt='logo' className='img-logo' />
        </a>
      </div>
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search data..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          style={{ paddingRight: "30px" }}
        />
      </div>
      <div className="logout">
        <Dropdown menu={{ checkUserRole }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img src='http://localhost:3001/img/profile.jpg' alt='profile' className='profile-logo'/>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;