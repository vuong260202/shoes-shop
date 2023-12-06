import {
  Form,
  Input
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState()
  const [productId, setProductId] = useState()
  const [name, setName] = useState()
  const [numberPhone, setNumberPhone] = useState()
  const [address, setAddress] = useState()
  const [total, setTotal] = useState()

  const handleAcceptForm = () => {
    setShowForm(true);
  };

  const handleTransaction = async () => {
    try{
      const response = await axios.post(`http://localhost:3000/product/add-transaction`,{
        userId, productId, name, numberPhone, address, total
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      if (response.status === 200) {
        console.log("create transaction success", response.data);
        navigate('/home')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem('token', 'null');
      }

      console.error('Error fetching product:', error)
    }
    
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/product-details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          }
        );
        setUserId(response.data.data.userId)
        setProductId(parseInt(id, 10))
        console.log("pr:", response.data.data.product);
        setProduct(response.data.data.product)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem('token', 'null');
        }
  
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* <Header onSearch={handleSearch} /> */}
      <h2>Tên sản phẩm: {product.map((item) => item.productName)}</h2>
      {console.log(product)}
      {product.map((item, index) => (
      <div key={index} style={{display: 'flex', textAlign: 'center'}}>
        {console.log("item: ", item)}
        <img src={'http://localhost:3001/' + item.path} alt={`Product ${item.id}`} style={{ width: '300px', height: '300px' }} />
        <div>
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
          <Form.Item label="Họ&Tên">
            <Input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input 
              type="text"
              value={numberPhone}
              onChange={(e) => setNumberPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}/>
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
        </Form>
      )}
    </div>
  )
}

export default ProductDetail
