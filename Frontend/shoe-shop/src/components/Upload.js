import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Upload.css";

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

  const [visible, setVisible] = useState(false);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("category", category);
      formData.append("file", file);

    //   console.log(formData);

      const response = await axios.post(
        "http://localhost:3000/product/upload-product",
        formData,
        {
          headers: {
            
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful", response.data);

      setVisible(true);
    } catch (error) {
      console.error("Error during upload:", error);
      // Handle error
      message.error("Upload failed.");
    }
  };

  
  const handleOk = () => {
    setVisible(false);
    navigate("/home");
  };

  const handleFileChange = (event) => {
    // Handle file change event
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
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
        <Form.Item label="Product Name">
          <Input onChange={(e) => setProductName(e.target.value)} />
        </Form.Item>

        <Form.Item label="Price">
          <Input onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label="Size">
          <Input onChange={(e) => setSize(e.target.value)} />
        </Form.Item>

        <Form.Item label="Category">
          <Input onChange={(e) => setCategory(e.target.value)} />
        </Form.Item>

        <Form.Item label="Upload Image">
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

      <Modal
        visible={visible}
        title="Upload Successful"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <p>Your product has been successfully uploaded.</p>
        <p>Click OK to go back to the main screen.</p>
      </Modal>
    </div>
  );
};

export default UploadProduct;
