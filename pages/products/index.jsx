import { Tag, Spin, message } from "antd";
import axios from "axios";
import React from "react";
import ActionMenu from "../../components/ActionMenu";
import CustomTable from "../../components/CustomTable";
import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";

export const getServerSideProps = async () => {
  // const session = await getSession(ctx);

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${session.user.accessToken}`,
  //   },
  // };

  const response = await axios.get(
    "http://localhost:4000/api/products",
  );

  return {
    props: {
      products: response.data,
    },
  };
};

export const Products = ({ products }) => {
  const [data,setData] = useState(products);
  const { deleteProduct } = useProductContext();

  const deleteData = (id) =>{
    const deleted = deleteProduct(id);
    message.info("Product Deleted successfully");
    setData(data.filter((product) => product.id !== id));
  }

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
      render: (_, record) => <ActionMenu link="/products" record={record} deleteProduct={deleteData} />,
    },
  ];

  return (
    <>
      {data && (
        <CustomTable
          data={data}
          param="name"
          columns={columns}
          addNewLink="/products/new"
        />
      )}

      {!data && (
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
