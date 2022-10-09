import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const menu = (link, record,deleteProduct) => {
  const router = useRouter();
  // const confirm = (id) => {
  //   message.info(deleteProduct(id));
  //   // router.reload();
  // };
  return (
    <Menu
      className=""
      items={[
        // {
        //   label: <Link href={`${link}/${record.id}`}> View</Link>,
        //   key: "0",
        //   icon: <EyeOutlined />,
        // },
        {
          label: <Link href={`${link}/edit/${record.id}`}>Edit</Link>,
          key: "1",
          icon: <EditOutlined />,
        },
        {
          label: (
            <Popconfirm
              title="Are you sure to delete this Product?"
              onConfirm={() => deleteProduct(record.id)}
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

const ActionMenu = ({ link, record,deleteProduct }) => {
  return (
    <Dropdown
      className="ml-2 cursor-pointer"
      overlay={menu(link, record,deleteProduct)}
      placement="bottom"
      trigger={["click"]}
    >
      <Button type="ghost" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default ActionMenu;
