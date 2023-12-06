import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/Home.css";
import Header from './Header';

const ProductItem = ({ product }) => {
  return (
    <li className="product-item" key={product.id}>
      <a href={`/product/${product.id}`}>
        <img
          src={product.path}
          alt="product"
          style={{ width: "200px", height: "auto" }}
        />
      </a>
      <p>Product Name: {product.productName}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
    </li>
  );
};

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate()

  useEffect((name) => {
    const token = localStorage.getItem('token')
    const fetchData = async () => {
      
      if (token === 'null') {
        navigate('/')
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/product/filter-product", {}, {
            headers:{
              Authorization: `Bearer ${token}`,
            },}
        );
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.setItem('token', 'null')
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div>
          {searchResult.map((result, index) => (
            <div key={index}>
            </div>
          ))}
        </div>
      </div>

      <div className="product-container">
      {products && (
        <ul>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default Search;
