import { Descriptions, Skeleton } from "antd";
import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";

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

const ViewOrder = ({ orderDetails }) => {
  return (
    <div className="form-card">
      {orderDetails.length > 0 && (
        <div>
          <div className="flex w-4/5 justify-between items-center">
            <h3>{`order No: ${orderDetails[0].order.orderNumber}`}</h3>
            <h3>{`Customer: ${orderDetails[0].order.customer}`}</h3>
            <h3>{`Status: ${orderDetails[0].order.status}`}</h3>
          </div>

          <Descriptions title="order details" column={4} bordered size="small">
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Product
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold border-blue-500">
              Price
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Quantity
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Total
            </Descriptions.Item>
            {orderDetails.map((detail) => (
              <>
                <Descriptions.Item key={detail.id}>
                  {detail.productName}
                </Descriptions.Item>
                <Descriptions.Item key={detail.id}>
                  {detail.price}
                </Descriptions.Item>
                <Descriptions.Item key={detail.id}>
                  {detail.discount}
                </Descriptions.Item>
                <Descriptions.Item key={detail.id}>
                  {detail.discount * detail.price}
                </Descriptions.Item>
              </>
            ))}

            <Descriptions.Item span={4}>Total VAT</Descriptions.Item>
            <Descriptions.Item span={4}>Total</Descriptions.Item>
          </Descriptions>
        </div>
      )}
      {orderDetails.length === 0 && (
        <>
          <Skeleton />
          <h2>This order has no details</h2>
        </>
      )}
    </div>
  );
};

ViewOrder.auth = true;
ViewOrder.layout = "L1";

export default ViewOrder;
