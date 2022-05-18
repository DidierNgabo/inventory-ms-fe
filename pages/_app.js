import "../styles/globals.css";
import "antd/dist/antd.css";
import UsersProvider from "../context/UserContext";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UsersProvider>
      <NextNProgress />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UsersProvider>
  );
}

export default MyApp;
