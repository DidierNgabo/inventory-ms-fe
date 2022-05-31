import {
  TeamOutlined,
  AreaChartOutlined,
  UploadOutlined,
  ShopOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Dashboard } from "@material-ui/icons";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const { Sider } = Layout;
  const { SubMenu } = Menu;

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
      icon: <TeamOutlined />,
      children: [
        { label: <Link href="/categories/">Categories</Link>, key: "category" },
        { label: "Procucts", key: "products" },
      ],
    },
    {
      key: "stock",
      label: "Stock Control",
      icon: <ShopOutlined />,
      children: [
        { label: "Orders", key: "orders" },
        { label: "Stock Issuance", key: "stock issuance" },
        { label: "Stock Adjustment", key: "stock adjustment" },
        { label: "Stock Return", key: "stock return" },
      ],
    },
    {
      key: "operations",
      label: "Operations",
      icon: <FileDoneOutlined />,
      children: [
        { label: "Contracts", key: "contracts" },
        { label: "Quotations", key: "quotations" },
      ],
    },
  ];

  return (
    <div>
      {/* <Sider>
          <div className>
            <h1>Meloline</h1>
          </div>
          
        </Sider> */}
      <Sider
        style={{ minHeight: "100vh", height: "100%" }}
        collapsible
        collapsed={collapsed}
        className="site-layout-background"
        onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu
          style={{ marginTop: "100px" }}
          mode="inline"
          theme="dark"
          items={menuItems}
          defaultSelectedKeys={["dashboard"]}
        ></Menu>
      </Sider>
    </div>
  );
}
