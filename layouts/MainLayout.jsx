import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Layout } from "antd";

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout className="site-layout">
        <Topbar />
        <Content style={{ margin: "10px 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Anik Rwanda ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
