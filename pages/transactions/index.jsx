import { Button, message, Popconfirm, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import CustomTable from "../../components/CustomTable";

import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    "http://localhost:4000/api/transactions",
    config
  );

  return {
    props: {
      transactions: response.data,
    },
  };
};

const Transactions = ({ transactions }) => {
  const [data, setData] = React.useState(transactions);

  const { data: session } = useSession();

  const token = session?.user?.accessToken;

  const confirm = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/transactions/${id}`,
        config
      );
      if (response) {
        message.success(response.data.message);
        setData(data.filter((quotation) => quotation.id !== id));
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Transaction No",
      dataIndex: "transactionNo",
      key: "quotationNo",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <Link href={`/products/${record.product.id}`}>
          <Typography.Link>{record.product.name}</Typography.Link>
        </Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Link href={`/transactions/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/transactions/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this transaction?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        addNewLink="/transactions/new"
      />
    </div>
  );
};

Transactions.layout = "L1";
Transactions.auth = true;

export default Transactions;
