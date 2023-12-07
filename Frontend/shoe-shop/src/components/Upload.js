import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Upload.css";
import Header from "./Header";
import FetchData from "./FetchData";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const UploadProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [total, setTotal] = useState("");

  const [visible, setVisible] = useState(false);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("category", category);
      formData.append("total", total);
      formData.append("file", file);

      FetchData.uploadProduct(formData);
      setVisible(true);
    } catch (error) {
      console.error("Error during upload:", error);
      message.error("Upload failed.");
    }
  };

  
  const handleOk = () => {
    console.log("oke");
    navigate("/home");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSearch = (search) => {}

  return (
    <div>
      <Header onSearch={handleSearch}/>
    <div className="upload-container">
      <Form
        className="upload-form"
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Tên sản phẩm">
          <Input onChange={(e) => setProductName(e.target.value)} />
        </Form.Item>

        <Form.Item label="Giá">
          <Input onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label="Size">
          <Input onChange={(e) => setSize(e.target.value)} />
        </Form.Item>

        <Form.Item label="Hãng">
          <Input onChange={(e) => setCategory(e.target.value)} />
        </Form.Item>

        <Form.Item label="Số lượng">
          <Input onChange={(e) => setTotal(e.target.value)} />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <input type="file" onChange={handleFileChange} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleUpload}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      {visible && <Modal
        visible={visible}
        title="Upload Successful"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <p>Thêm sản phẩm thành công</p>
        <p>nhấn OK để trở lại</p>
      </Modal>}
      
    </div>
    </div>
  );
};

export default UploadProduct;
