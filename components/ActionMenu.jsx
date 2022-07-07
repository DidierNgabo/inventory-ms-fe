import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Popconfirm } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useProductContext } from "../context/ProductContext";

const menu = (link, record) => {
  const router = useRouter();
  const { deleteProduct } = useProductContext();
  const confirm = (id) => {
    message.info(deleteProduct(id));

    router.reload();
  };
  return (
    <Menu
      className=""
      items={[
        {
          label: <Link href={`${link}/${record.id}`}> View</Link>,
          key: "0",
          icon: <EyeOutlined />,
        },
        {
          label: <Link href={`${link}/edit/${record.id}`}>Edit</Link>,
          key: "1",
          icon: <EditOutlined />,
        },
        {
          label: (
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => confirm(record.id)}
              okText="Yes"
              placement="topRight"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          ),
          key: "3",
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );
};

const ActionMenu = ({ link, record }) => {
  return (
    <Dropdown
      className="ml-2 cursor-pointer"
      overlay={menu(link, record)}
      placement="bottom"
      trigger={["click"]}
    >
      <Button type="ghost" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default ActionMenu;
