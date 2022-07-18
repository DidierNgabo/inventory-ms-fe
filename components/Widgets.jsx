import { BarChart, Payment, People, PieChart } from "@material-ui/icons";
import React from "react";
import SmallWidget from "./SmallWidget";

const Widgets = ({ transactionsCount, quotationsCount, productsCount }) => {
  return (
    <div className="relative bg-blueGray-800 md:pt-8 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="TRANSACTIONS"
                statTitle={transactionsCount}
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName={<BarChart />}
                statIconColor="bg-red-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="NEW CUSTOMERS"
                statTitle="2,356"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="Since last week"
                statIconName={<People />}
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="PRODUCTS"
                statTitle={productsCount}
                statArrow="down"
                statPercent="1.10"
                statPercentColor="text-orange-500"
                statDescripiron="Since yesterday"
                statIconName={<PieChart />}
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="QUOTATIONS"
                statTitle={quotationsCount}
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName={<Payment />}
                statIconColor="bg-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
