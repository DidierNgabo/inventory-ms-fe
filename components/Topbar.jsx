import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { NotificationsNone } from "@material-ui/icons";
import { Layout } from "antd";
import { signOut, useSession } from "next-auth/react";
import jwt from "jwt-decode";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const { Header } = Layout;

export default function Topbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.accessToken;
  

  const handleSignOut = () => {
    signOut({callbackUrl:"/login"});
    // router.push("/login");
  };

  const menu = (
    <Menu
      className=""
      items={[
        {
          label: "Profile",
          key: "0",
          icon: <UserOutlined />,
        },
        {
          label: <a href="https://www.aliyun.com">Settings</a>,
          key: "1",
          icon: <SettingOutlined />,
        },
        {
          type: "divider",
        },
        {
          label: "Logout",
          key: "3",
          onClick: () => handleSignOut(),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  let user = null;

  if (token) {
    user = jwt(token);
  }
  return (
    <Header
      style={{
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="w-full">
        <div className=" w-full flex items-center justify-between">
          <div className="">
            <span className="text-xl font-mono font-semibold">Dashboard</span>
          </div>
          <div className=" w-1/5 flex items-center justify-evenly">
            <div className="topbarIconContainer">
              <div className="relative">
                <NotificationsNone />
                <h3 className="topIconBadge"></h3>
              </div>
            </div>
            <div>
              <Dropdown
                className="ml-2 cursor-pointer"
                overlay={menu}
                placement="bottom"
                trigger={["click"]}
              >
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={4}
                >
                  {user && user.email.charAt(0).toUpperCase()}
                </Avatar>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
