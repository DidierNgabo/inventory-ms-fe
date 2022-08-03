import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@ant-design/pro-components/dist/components.css";
import UsersProvider from "../context/UserContext";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import NextNProgress from "nextjs-progressbar";
import AccountLayout from "../layouts/Account";
import CategoriesProvider from "../context/CategoryContext";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { Spin } from "antd";
import ProductProvider from "../context/ProductContext";
import QuotationProvider from "../context/QuotationContext";
import OrderProvider from "../context/OrderContext";
import TransactionProvider from "../context/TransactionContext";
import RequestProvider from "../context/RequestContext";
import RoleProvider from "../context/RoleContext";
import InspectionProvider from "../context/InspectionContext";
import ConfirmLayout from "../layouts/ConfirmLayout";

const layouts = {
  L1: MainLayout,
  L2: AccountLayout,
  L3: ConfirmLayout,
};

function MyApp({ session, Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <UsersProvider>
            <RoleProvider>
              <TransactionProvider>
                <CategoriesProvider>
                  <ProductProvider>
                    <OrderProvider>
                      <InspectionProvider>
                        <QuotationProvider>
                          <RequestProvider>
                            <NextNProgress />
                            <Layout>
                              <Component {...pageProps} />
                            </Layout>
                          </RequestProvider>
                        </QuotationProvider>
                      </InspectionProvider>
                    </OrderProvider>
                  </ProductProvider>
                </CategoriesProvider>
              </TransactionProvider>
            </RoleProvider>
          </UsersProvider>
        </Auth>
      ) : (
        <>
          <UsersProvider>
            <CategoriesProvider>
              <ProductProvider>
                <NextNProgress />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ProductProvider>
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
  return (
    <div className="h-screen flex flex-col items-center text-4xl justify-center">
      <Spin size="large" />
    </div>
  );
}
