import "../styles/globals.css";
import "antd/dist/antd.css";
import UsersProvider from "../context/UserContext";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import NextNProgress from "nextjs-progressbar";
import AccountLayout from "../layouts/Account";
import CategoriesProvider from "../context/CategoryContext";
import { SessionProvider, useSession, signIn } from "next-auth/react";

const layouts = {
  L1: MainLayout,
  L2: AccountLayout,
};

function MyApp({ session, Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <UsersProvider>
            <CategoriesProvider>
              <NextNProgress />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CategoriesProvider>
          </UsersProvider>
        </Auth>
      ) : (
        <>
          <UsersProvider>
            <CategoriesProvider>
              <NextNProgress />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CategoriesProvider>
          </UsersProvider>
        </>
      )}
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
