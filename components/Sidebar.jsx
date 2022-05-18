import {
  TeamOutlined,
  AreaChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Dashboard } from "@material-ui/icons";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  const { Sider } = Layout;
  const { SubMenu } = Menu;
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
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<Dashboard />}>
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AreaChartOutlined />}>
            Analytics
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Sales
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key="4">
            <Link href="/users/">Users</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Items">
            <Menu.Item key="6"> Items</Menu.Item>
            <Menu.Item key="7"> new Item</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="Pharmacies">
            <Menu.Item key="8">Pharmacies</Menu.Item>
            <Menu.Item key="9">new Pharmacy</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}
