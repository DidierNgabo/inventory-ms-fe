import { Image, Table } from "antd";
import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    `http://localhost:4000/api/productdetails/product/${id}`,
    config
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
