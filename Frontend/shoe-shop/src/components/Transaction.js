import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Header from "./Header";
import FetchData from "./FetchData";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Số điên thoại",
    dataIndex: "numberPhone",
  },
  {
    title: "Tên người dùng",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
  },
  {
    title: "Số lượng",
    dataIndex: "total",
  },
  {
    title: "Giá",
    dataIndex: "amount",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createAt",
  },
  {
    title: "Tổng số tiền",
    dataIndex: "amountSum",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const handleClick = (status, transaction) => {
  FetchData.handleTransaction({status, transaction});
  window.location.reload();
}

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData.getTransaction().then((res) => {
      const newData = res.transactions.map((transaction, index) => ({
        key: index,
        id: transaction.id,
        numberPhone: transaction.numberPhone,
        name: transaction.name,
        address: transaction.address,
        productName: transaction.productName,
        total: transaction.total,
        amount: transaction.amount,
        createAt: transaction.createdAt,
        amountSum: transaction.amountSum,
        status: transaction.status,
      }));
      setData(newData);
    })
    .catch((error) => {
      console.error("Error fetching transaction data: ", error);
    });
  }, [])

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  
  const handleSearch = (search) => {}

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <div>
        <Button onClick={() => handleClick('pending', selectedRowKeys.map((key) => data[key].id))}>đang chờ</Button>
        <Button onClick={() => handleClick('process', selectedRowKeys.map((key) => data[key].id))}>đang xử lý</Button>
        <Button onClick={() => handleClick('done', selectedRowKeys.map((key) => data[key].id))}>hoàn thành</Button>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
    </div>
  );
};
export default App;
