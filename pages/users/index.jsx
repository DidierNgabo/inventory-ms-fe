import React from "react";
import axios from "axios";
import { Button, message, Popconfirm, Spin, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import CustomTable from "../../components/CustomTable";
import { UsersContext } from "../../context/UserContext";

const Users = () => {
  const { data, error, isLoaded,setData } = React.useContext(UsersContext);
  const confirm = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/users/${id}`
      );
      if (response) {
        message.success("User deleted successfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const activate = async (id) =>{
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${id}`,{
          isActive:true
        }
      );

      
      setData((prev) =>  prev.map((prev) =>
      prev.id === id ? { ...prev, isActive: true } : prev
    ))

      // if (response) {
      //   message.success("User activated successfully");
      // }
    } catch (error) {
      message.error(error.message);
    }
  }

  const deactivate = async(id) =>{
    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/${id}`,{
          isActive:false
        }
      );
      console.log(response);
      setData((prev) =>  prev.map((prev) =>
      prev.id === id ? { ...prev, isActive: false } : prev
    ))
    } catch (error) {
      message.error(error.message);
    }
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Link href={`/roles/${record.role.id}`}>
          <Typography.Link>{record.role.name}</Typography.Link>
        </Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <>
         <Popconfirm
            title="Are you sure to deactivate this user?"
            onConfirm={() => deactivate(record.id)}
            okText="Yes"
            cancelText="No"
          >
             {record.isActive && <Tag color="green">ACTIVE</Tag>}
          </Popconfirm>
         
          <Popconfirm
            title="Are you sure to activate this user?"
            onConfirm={() => activate(record.id)}
            okText="Yes"
            cancelText="No"
          >
             {!record.isActive && <Tag color="volcano">INACTIVE</Tag>}
          </Popconfirm>
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
          <Link href={`/users/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} size="small" />
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
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
        <CustomTable
          data={data}
          columns={columns}
          param="name"
          addNewLink="/users/new"
        />
      )}
      {!isLoaded && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

Users.auth = true;
Users.layout = "L1";

export default Users;
