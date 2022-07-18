import React from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import CustomTable from "../../components/CustomTable";
import { Button, Popconfirm, Spin } from "antd";
import Link from "next/link";
import moment from "moment";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get("http://localhost:4000/api/orders", config);

  return {
    props: {
      orders: response.data,
    },
  };
};

const Orders = ({ orders }) => {
  const [data, setData] = React.useState(orders);

  const confirm = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/quotations/${id}`
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
      title: "Order No",
      dataIndex: "orderNumber",
      key: "orderNo",
    },
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
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
      render: (text, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Link href={`/orders/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/orders/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this Order?"
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
      {orders?.length !== 0 && (
        <CustomTable data={data} columns={columns} addNewLink="/orders/new" />
      )}

      {orders?.length == 0 && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

Orders.layout = "L1";
Orders.auth = true;

export default Orders;
