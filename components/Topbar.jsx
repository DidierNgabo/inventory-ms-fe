import React from "react";
import { Avatar, Button } from "antd";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Layout } from "antd";
import Image from "next/image";

const { Header } = Layout;
export default function Topbar() {
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Header style={{ background: "white" }}>
      <div className="w-full">
        <div className=" w-full flex items-center justify-between">
          <div className="">
            <span className="text-xl font-mono font-semibold">Anik Rwanda</span>
          </div>
          <div className=" w-1/3 flex items-center justify-evenly">
            <div className="topbarIconContainer">
              <div className="relative">
                <NotificationsNone />
                <h3 className="topIconBadge"></h3>
              </div>
            </div>
            <div className="topbarIconContainer">
              <div className="relative">
                <Language />
                <h3 className="topIconBadge"></h3>
              </div>
            </div>
            <div className="topbarIconContainer">
              <Settings />
            </div>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
              gap={4}
            >
              U
            </Avatar>

            <Button type="primary" onClick={handleClick}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
}
