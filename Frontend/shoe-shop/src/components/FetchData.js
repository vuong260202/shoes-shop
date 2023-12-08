import axios from "axios";

const transaction = async (conditions) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/transaction/add-transaction`,
      conditions,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("token", "null");
    }

    console.error("Error fetching product:", error);
  }
};

const productDetail = async (id) => {
  try {
    console.log("id: ", id);
    const response = await axios.get(
      `http://localhost:3000/product/product-details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("response:", response.data.data);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("token", "null");
    }

    console.error("Error fetching product:", error);
  }
};

const filterProducts = async (conditions) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/product/filter-product",
      conditions,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("token", "null");
    }

    console.error("Error fetching data:", error);
  }
};

const getRole = async () => {
  try {
    const res = await axios.get("http://localhost:3000/auth/get-role", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.setItem("token", "null");
    }

    console.error("Error fetching product:", error);
  }
};

const login = async (conditions) => {
  try {
    console.log(conditions);
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      conditions
    );

    return response;
  } catch (error) {
    return error.response;

    console.error("Error fetching product:", error);
  }
};

const logout = async () => {};
const signup = async (attributes) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/signup", attributes);

    return res;
  } catch (error) {
    return error.response;
  }
};

const getTransaction = async () => {
    try {
        const res = await axios.get("http://localhost:3000/transaction/get-transaction", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        console.log(res.data.data);
        return res.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("token", "null");
        }
    
        console.error("Error fetching product:", error);
      }
};
const handleTransaction = async (body) => {
    console.log('body:', body);
    try {
        const res = await axios.post("http://localhost:3000/transaction/update-transaction", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        console.log(res);
        return res.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("token", "null");
        }
    
        console.error("Error fetching product:", error);
      }
};

const updateProduct = async (body) => {
    console.log('body:', body);
    try {
        const res = await axios.post("http://localhost:3000/product/update-product", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        console.log(res);
        return res.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("token", "null");
        }
    
        console.error("Error fetching product:", error);
      }
};

const uploadProduct = async (formData) => {
  await axios.post(
    "http://localhost:3000/product/upload-product",
    formData,
    {
      headers: {
        
        "Content-Type": "multipart/form-data",
      },
    }
  );
} 


export default {
  transaction,
  productDetail,
  updateProduct,
  uploadProduct,
  filterProducts,
  getTransaction,
  handleTransaction,
  getRole,
  login,
  logout,
  signup,
};
