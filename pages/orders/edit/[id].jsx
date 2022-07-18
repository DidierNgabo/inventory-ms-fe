import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";
import AddOrder from "../../../components/AddOrder";
import AddOrderDetail from "../../../components/AddOrderDetail";
import OrderStepPanel from "../../../components/OrderStepPanel";
import { useOrderContext } from "../../../context/OrderContext";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    `http://localhost:4000/api/order-details/order/${id}`,
    config
  );

  return {
    props: {
      orderDetails: response.data,
    },
  };
};

const EditOrder = ({ orderDetails }) => {
  const { order, data, setOrder, setData } = useOrderContext();

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

  //   if (orderDetails.length > 0) {
  //     setOrder({ ...orderDetails[0].order });
  //     console.log(order);
  //     const details = orderDetails.map(({ order, ...detail }) => detail);
  //     setData([...details]);
  //     console.log(data);
  //   }

  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Update Order
      </h2>
      <OrderStepPanel steps={steps} />
    </div>
  );
};

EditOrder.layout = "L1";
EditOrder.auth = true;

export default EditOrder;
