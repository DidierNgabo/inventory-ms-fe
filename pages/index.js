import Head from "next/head";
import Widgets from "../components/Widgets";
import MainLayout from "../layouts/MainLayout";
import CardLineChart from "../components/CardLineChart";

export default function Home() {
  return (
    <>
      <Head>
        <title>Anik Rwanda Hms</title>
      </Head>
      <div>
        <Widgets />
        <CardLineChart />
      </div>
    </>
  );
}

// Home.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };
