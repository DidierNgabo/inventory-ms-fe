import Head from "next/head";
import Widgets from "../components/Widgets";
import CardLineChart from "../components/CardLineChart";

const Home = () => {
  return (
    <>
      <Head>
        <title>Anik Rwanda Hms</title>
      </Head>
      <div>
        <Widgets />
        <div className="w-full flex p-2 items-center justify-center">
          <div className="w-1/2 p-1">
            <CardLineChart />
          </div>
          <div className="w-1/2 p-1">
            <CardLineChart />
          </div>
        </div>
      </div>
    </>
  );
};

Home.layout = "L1";

export default Home;
