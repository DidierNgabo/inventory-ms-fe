import React from "react";
import axios from "axios";
import { Button, message, Popconfirm, Spin, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import CustomTable from "../../components/CustomTable";
import { UsersContext } from "../../context/UserContext";

// export const getStaticProps = async () => {

//   // const response = await axios.get("http://localhost:4000/api/users");
//   return {
//     props: { users: data, error, isLoaded },
//   };
// };

const Users = () => {
  const { data, error, isLoaded } = React.useContext(UsersContext);
  console.log(data);
  const confirm = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/users/${id}`
      );
      if (response) {
        message.success("pharmacy deleted successfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <>
          {record.isActive && <Tag color="green">ACTIVE</Tag>}
          {!record.isActive && <Tag color="volcano">INACTIVE</Tag>}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (text, record) => (
        <div className="w-1/2 flex items-start justify-between">
          <Link href="/users/edit/">
            <Button type="ghost" icon={<EditOutlined />} size="small" />
          </Link>
          <Button type="ghost" icon={<EyeOutlined />} size="small" />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      {isLoaded && (
        <CustomTable data={data} columns={columns} addNewLink="/users/new" />
      )}
      {!isLoaded && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

Users.layout = "L1";

export default Users;
