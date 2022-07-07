import { MoreOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import axios from "axios";
import React from "react";
import ActionMenu from "../../components/ActionMenu";
import CustomTable from "../../components/CustomTable";

export const getServerSideProps = async (ctx) => {
  const response = await axios.get("http://localhost:4000/api/products");

  return {
    props: {
      products: response.data,
    },
  };
};

export const Products = ({ products }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "amountInStock",
      key: "name",
    },
    {
      title: "Vat",
      dataIndex: "vat",
      key: "vat",
      render: (text, record) => (
        <>
          {record.vat && <Tag color="geekblue">inclusive</Tag>}

          {!record.vat && <Tag color="green">exclusive</Tag>}
        </>
      ),
    },
    {
      title: "Max Stock",
      dataIndex: "maximumStock",
      key: "max stock",
    },
    {
      title: "Reoder Qty",
      dataIndex: "reorderQuantity",
      key: "reoder",
    },
    {
      title: "Warranty",
      dataIndex: "warranty",
      key: "warranty",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 80,
      render: (text, record) => <ActionMenu link="/products" record={record} />,
    },
  ];

  return (
    <>
      {products?.length !== 0 && (
        <CustomTable
          data={products}
          columns={columns}
          addNewLink="/products/new"
        />
      )}

      {products?.length == 0 && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

Products.auth = true;
Products.layout = "L1";

export default Products;
