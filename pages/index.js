import Head from "next/head";
import Widgets from "../components/Widgets";
import CardLineChart from "../components/CardLineChart";
import { getSession } from "next-auth/react";
import axios from "axios";
import CardPieChart from "../components/CardPieChart";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const transactionsResponse = await axios.get(
    "http://localhost:4000/api/transactions/count",
    config
  );

  const quotationsResponse = await axios.get(
    "http://localhost:4000/api/quotations/count",
    config
  );

  const productsResponse = await axios.get(
    "http://localhost:4000/api/products/count",
    config
  );

  return {
    props: {
      transactionsCount: transactionsResponse.data,
      quotationsCount: quotationsResponse.data,
      productsCount: productsResponse.data,
    },
  };
};

const Home = ({ transactionsCount, quotationsCount, productsCount }) => {
  return (
    <>
      <Head>
        <title>Anik Rwanda Hms</title>
      </Head>
      <div>
        <Widgets
          transactionsCount={transactionsCount}
          quotationsCount={quotationsCount}
          productsCount={productsCount}
        />
        <div className="w-full flex p-2 items-center justify-center">
          <div className="w-1/2 p-1">
            <CardLineChart />
          </div>
          <div className="w-1/2 p-1">
            <CardPieChart />
          </div>
        </div>
      </div>
    </>
  );
};

Home.auth = true;
Home.layout = "L1";

export default Home;
