import {
  TeamOutlined,
  ShopOutlined,
  FileDoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Dashboard } from "@material-ui/icons";
import Image from "next/image";
import logo from "../public/images/anik.jpg";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

import { useSession } from "next-auth/react";
import jwtDecode from "jwt-decode";

export default function Sidebar() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [collapsed, setCollapsed] = useState(false);

  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const { Sider } = Layout;

  const menuItemsAdmin = [
    {
      key: "dashboard",
      label: <Link href="/">Dashboard</Link>,
      icon: <Dashboard />,
    },
    {
      key: "users",
      label: <Link href="/users/">Users</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "inventory",
      label: "Inventory",
      icon: <ShopOutlined />,
      children: [
        { label: <Link href="/categories/">Categories</Link>, key: "category" },
        { label: <Link href="/products/">Products</Link>, key: "products" },
        {
          label: <Link href="/transactions/">Transactions</Link>,
          key: "transactions",
        },
      ],
    },
    {
      key: "operations",
      label: "Operations",
      icon: <FileDoneOutlined />,
      children: [
        {
          label: <Link href="/quotations/">Quotations</Link>,
          key: "quotations",
        },
        {
          label: <Link href="/requests/">Online Requests</Link>,
          key: "requests",
        },
        {
          label: <Link href="/inspections/">Inspections</Link>,
          key: "inspections",
        },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link href="/roles/">Roles</Link>,
          key: "roles",
        },
      ],
    },
  ];

  const menuItemsAccountant = [
    {
      key: "dashboard",
      label: <Link href="/">Dashboard</Link>,
      icon: <Dashboard />,
    },
    {
      key: "operations",
      label: "Operations",
      icon: <FileDoneOutlined />,
      children: [
        {
          label: <Link href="/quotations/">Quotations</Link>,
          key: "quotations",
        },
        {
          label: <Link href="/requests/">Online Requests</Link>,
          key: "requests",
        },
      ],
    },
  ];

  const menuItemsTechnician = [
    {
      key: "dashboard",
      label: <Link href="/">Dashboard</Link>,
      icon: <Dashboard />,
    },
    {
      key: "operations",
      label: "Operations",
      icon: <FileDoneOutlined />,
      children: [
        {
          label: <Link href="/requests/">Online Requests</Link>,
          key: "requests",
        },
        {
          label: <Link href="/inspections/">Inspections</Link>,
          key: "inspections",
        },
      ],
    },
  ];

  const menuItemsCustomer = [
    {
      key: "dashboard",
      label: <Link href="/">Dashboard</Link>,
      icon: <Dashboard />,
    },
    {
      label: <Link href="/requests/">Online Requests</Link>,
      key: "requests",
      icon: <Dashboard />,
    },
  ];

  return (
    <div>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        className="w-3/12"
        onCollapse={onCollapse}
      >
        <div className=" w-4/5 mx-auto mt-6 ">
          <Image src={logo} alt="logo" />
        </div>
        <Menu
          style={{ marginTop: "10px" }}
          mode="inline"
          theme="dark"
          items={
            !user
              ? menuItemsAdmin
              : user.role.name === "admin"
              ? menuItemsAdmin
              : user.role.name === "accountant"
              ? menuItemsAccountant
              : user.role.name === "technician"
              ? menuItemsTechnician
              : menuItemsCustomer
          }
          defaultSelectedKeys={["dashboard"]}
        ></Menu>
      </Sider>
    </div>
  );
}
