import React from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CardPieChart = ({ count }) => {
  const data = {
    labels: ["Rejected", "Approved", "Accepted"],
    datasets: [
      {
        label: "status of Quotations",
        data: [count.rejected, count.approved, count.accepted],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-[#021529]">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-[#2291FF] mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                Quotations status
              </h2>
            </div>
          </div>
        </div>
        <div className="p-3 flex-auto">
          {/* Chart */}
          <div className="relative">
            <Doughnut
              data={data}
              height={260}
              width={260}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPieChart;
