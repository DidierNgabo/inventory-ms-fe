import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Button, message, Popconfirm, Table, Tag } from "antd";
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

export const getStaticProps = async () => {
  const response = await axios.get("http://localhost:4000/api/users");
  return {
    props: { users: response.data },
  };
};

const Users = ({ users }) => {
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
  return <CustomTable data={users} columns={columns} addNewLink="/users/new" />;
};

Users.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Users;