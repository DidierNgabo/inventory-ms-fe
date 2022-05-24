import "../styles/globals.css";
import "antd/dist/antd.css";
import UsersProvider from "../context/UserContext";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import NextNProgress from "nextjs-progressbar";
import AccountLayout from "../layouts/Account";

const layouts = {
  L1: MainLayout,
  L2: AccountLayout,
};

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <UsersProvider>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UsersProvider>
  );
}

export default MyApp;
