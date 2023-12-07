import { Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Header.css";
import FetchData from "./FetchData";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [role, setRole] = useState("");

  const handleLogout = () => {
    localStorage.setItem("token", "null");
    navigate("/");
  };

  const handleUpload = () => {
    navigate("/admin/upload");
  };

  const handleTransaction = () => {
    navigate("/admin/transaction");
  };

  const handlePassword = () => {
    navigate("/auth/set-password");
  };

  const handleProduct = () => {
    navigate("/admin/products");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  useEffect(() => {
    FetchData.getRole().then((res) => {
      console.log(res.data);
      setRole(res.data.role);
    });
  }, []);

  const items =
    role === "admin"
      ? [
          {
            label: <a onClick={handleUpload}> Thêm sản phẩm </a>,
            key: "0",
          },
          {
            label: <a onClick={handleProduct}> Thông tin sản phẩm </a>,
            key: "1",
          },
          {
            label: <a onClick={handleTransaction}> Giao dịch chờ </a>,
            key: "2",
          },
          {
            label: <a onClick={handlePassword}> Đổi mật khẩu </a>,
            key: "4",
          },
          {
            label: <a onClick={handleLogout}> Thoát </a>,
            key: "5",
          },
        ]
      : [
          {
            label: <a onClick={handlePassword}> Đổi mật khẩu </a>,
            key: "4",
          },
          {
            label: <a onClick={handleLogout}> Thoát </a>,
            key: "5",
          },
        ];

  return (
    <div className="header">
      <div className="logo">
        <a href={`/home`}>
          <img
            src="http://localhost:3001/img/logo.jpg"
            alt="logo"
            className="img-logo"
          />
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
        {console.log("item", items)}
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                src="http://localhost:3001/img/profile.jpg"
                alt="profile"
                className="profile-logo"
              />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
