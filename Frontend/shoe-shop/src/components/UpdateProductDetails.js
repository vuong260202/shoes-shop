import { Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/UpdateProductDetail.css";

import Header from "./Header";
import FetchData from "./FetchData";

const UpdateProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState();
  const [total, setTotal] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        FetchData.productDetail(id).then((res)=> {
          console.log("res: ", res);
          setProduct(res.product[0])
          setPrice(res.product[0].price)
          setTotal(res.product[0].total)
          setSize(res.product[0].size)
        })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("token", "null");
        }

        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    console.log("+++++++++++",size, total, price);
    FetchData.updateProduct({id, size, total, price});
  };

  const handleSearch = (search) => {}

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <div style={{ width: "100%" }}>
          <div
            key={0}
            style={{ display: "flex", textAlign: "center", width: "100%" }}
          >
            <img
              src={"http://localhost:3001/" + product.path}
              alt={`Product ${product.id}`}
              style={{ height: "auto", width: "50%" }}
            />
            <div style={{ width: "50%" }}>
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item label="ID" className="item">
                  <Input type="number" defaultValue={product.id} readOnly />
                </Form.Item>
                <Form.Item label="Tên sản phẩm">
                  <Input type="text" defaultValue={product.productName} readOnly />
                </Form.Item>
                <Form.Item label="Hãng">
                  <Input type="text" defaultValue={product.category} readOnly />
                </Form.Item>
                <Form.Item label="Giá">
                  <Input
                    type="text"
                    value={price}
                    defaultValue={product.price}
                    onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                  />
                </Form.Item>
                <Form.Item label="Số lượng">
                  <Input
                    type="text"
                    value={total}
                    defaultValue={product.total}
                    onChange={(e) => setTotal(parseInt(e.target.value, 10))}
                  />
                </Form.Item>
                <Form.Item label="Size">
                  <Input
                    type="text"
                    value={size}
                    defaultValue={product.size}
                    onChange={(q) => setSize(parseInt(q.target.value, 10))}
                  />
                </Form.Item>
                <Form.Item>
                  <button onClick={handleClick}>Lưu</button>
                </Form.Item>
              </Form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UpdateProductDetail;
