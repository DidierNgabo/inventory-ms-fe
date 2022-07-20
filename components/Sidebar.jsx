import {
  TeamOutlined,
  AreaChartOutlined,
  UploadOutlined,
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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const { Sider } = Layout;

  const menuItems = [
    {
      key: "dashboard",
      label: <Link href="/">Dashboard</Link>,
      icon: <Dashboard />,
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: <AreaChartOutlined />,
    },
    {
      key: "sales",
      label: "Sales",
      icon: <UploadOutlined />,
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
    // {
    //   key: "stock",
    //   label: "Stock Control",
    //   icon: <ShopOutlined />,
    //   children: [
    //     { label: <Link href="/orders/">Orders</Link>, key: "orders" },
    //     { label: "Stock Issuance", key: "stock issuance" },
    //     { label: "Stock Adjustment", key: "stock adjustment" },
    //     { label: "Stock Return", key: "stock return" },
    //   ],
    // },
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
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link href="/roles/">Roles</Link>,
          key: "roles",
        },
        // {
        //   label: <Link href="/requests/">Online Requests</Link>,
        //   key: "requests",
        // },
      ],
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
          items={menuItems}
          defaultSelectedKeys={["dashboard"]}
        ></Menu>
      </Sider>
    </div>
  );
}
