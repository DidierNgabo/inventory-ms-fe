import React from "react";
import SmallWidget from "./SmallWidget";

const Widgets = () => {
  return (
    <div className="relative bg-blueGray-800 md:pt-8 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="TRAFFIC"
                statTitle="350,897"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="far fa-chart-bar"
                statIconColor="bg-red-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="NEW USERS"
                statTitle="2,356"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="Since last week"
                statIconName="fas fa-chart-pie"
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="SALES"
                statTitle="924"
                statArrow="down"
                statPercent="1.10"
                statPercentColor="text-orange-500"
                statDescripiron="Since yesterday"
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
              />
            </div>

            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <SmallWidget
                statSubtitle="PERFORMANCE"
                statTitle="49,65%"
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="fas fa-percent"
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
