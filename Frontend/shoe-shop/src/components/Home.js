import { Pagination } from 'antd';
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
      <a href={`/product/${product.id}`}>Tên sản phẩm: {product.productName}</a>
    </li>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(null)
  const navigate = useNavigate()

  const handleSearch = async (searchQuery) => {
    const token = localStorage.getItem('token')

    try {
      const conditions = {page: page}

      if (searchQuery) {
        setFilter(searchQuery)
      }

      if (searchQuery || filter) {
        if (filter !== searchQuery && searchQuery !== null) {
          conditions.filters = {
            productName: searchQuery,
          }
        } else {
          conditions.filters = {
            productName: filter,
          }
        }
      }

      const response = await axios.post(
        "http://localhost:3000/product/filter-product",
        conditions,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data.products);
      setTotal(response.data.data.total);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem('token', 'null');
      }

      console.error("Error fetching data:", error);
    }
  };

  const handlePage = (newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    handleSearch()
  }, [page])

  useEffect(() => {
    const token = localStorage.getItem('token')
    setFilter(null)
    setPage(1)
    const fetchData = async () => {
      if (token === 'null') {
        navigate('/')
      }

      handleSearch()
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="product-container">
        {products && (
          <ul className = "product-list">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </ul>
        )}
      </div>
      <div className='pageination'>
        <Pagination current={page} defaultCurrent={1} total={total} onChange={(newPage) => handlePage(newPage)} />
        <a>total: {total}</a>
      </div>
    </div>
  );
};

export default Home;
