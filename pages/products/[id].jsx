import { Image, Table } from "antd";
import axios from "axios";
import React from "react";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const response = await axios.get(
    `http://localhost:4000/api/productdetails/product/${id}`
  );

  return {
    props: {
      details: response.data,
    },
  };
};

const ViewProduct = ({ details }) => {
  const columns = [
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
    },
    {
      title: "price",
      key: "price",
      dataIndex: "price",
    },
  ];

  return (
    <Table columns={columns} dataSource={details} rowKey="id" size="small" />
  );
};

export default ViewProduct;

ViewProduct.layout = "L1";
ViewProduct.auth = true;
