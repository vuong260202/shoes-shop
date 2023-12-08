import { Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "./FetchData";
import Header from "./Header";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState();
  const [productId, setProductId] = useState();
  const [name, setName] = useState();
  const [numberPhone, setNumberPhone] = useState();
  const [address, setAddress] = useState();
  const [total, setTotal] = useState();

  const handleAcceptForm = () => {
    setShowForm(true);
  };

  const handleTransaction = async () => {
    let productName = product[0].productName;
    let conditions = {
      userId,
      productId,
      productName,
      name,
      numberPhone,
      address,
      total,
    }
    console.log("---", conditions);
    FetchData.transaction({
      userId,
      productId,
      productName,
      name,
      numberPhone,
      address,
      total,
    }).then((res) => {
      if (res.status === 200) {
        console.log("create transaction success", res.data);
        navigate("/home");
      }
    });
  };

  useEffect(() => {
    FetchData.productDetail(id)
      .then((res) => {
        setUserId(res.userId);
        setProduct(res.product);
      })
      .catch();
    setProductId(parseInt(id, 10));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  
  const handleSearch = (search) => {}

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <h2>Tên sản phẩm: {product.map((item) => item.productName)}</h2>
      {console.log(product)}
      {product.map((item, index) => (
        <div key={index} style={{ display: "flex", textAlign: "center" }}>
          {console.log("item: ", item)}
          <img
            src={"http://localhost:3001/" + item.path}
            alt={`Product ${item.id}`}
            style={{ width: "40%", height: "auto" }}
          />
          <div style={{
            width: '60%'
          }}>
            <p>Tên sản phẩm: {item.productName}</p>
            <p>Giá: {item.price}</p>
            <p>size: {item.size}</p>
            <p>Hãng: {item.category}</p>
            <p>Số lượng đang có: {item.total}</p>

            <button onClick={handleAcceptForm}>Mua</button>
          </div>
        </div>
      ))}

      {showForm && (
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          width: '100%',
      }}><Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      // disabled={componentDisabled}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Họ&Tên">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          type="text"
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Số lượng">
        <Input
          type="number"
          value={total}
          onChange={(e) => setTotal(parseInt(e.target.value, 10))}
        />
      </Form.Item>
      <Form.Item>
        <button onClick={handleTransaction}>Xác nhận</button>
      </Form.Item>
    </Form> </div>
      )}
    </div>
  );
};

export default ProductDetail;
