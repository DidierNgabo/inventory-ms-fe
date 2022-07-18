import React from "react";
import AddOrder from "../../components/AddOrder";
import AddOrderDetail from "../../components/AddOrderDetail";
import OrderStepPanel from "../../components/OrderStepPanel";

const NewOrder = () => {
  const steps = [
    {
      step: 1,
      title: "Order Info",
      content: <AddOrder />,
    },
    {
      step: 2,
      title: "Order Details",
      content: <AddOrderDetail />,
    },
  ];

  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Create New Order
      </h2>
      <OrderStepPanel steps={steps} />
    </div>
  );
};

NewOrder.layout = "L1";
NewOrder.auth = true;

export default NewOrder;
