import React from "react";

import { getSession } from "next-auth/react";
import axios from "axios";
import { Descriptions, Skeleton } from "antd";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };
  const response = await axios.get(
    `http://localhost:4000/api/quotation-details/quotation/${id}`,
    config
  );
  return {
    props: {
      quotationDetails: response.data,
    },
  };
};

const QuotationInfo = ({ quotationDetails }) => {
  return (
    <div className="form-card">
      {quotationDetails.length > 0 && (
        <div>
          <div className="flex w-4/5 justify-between items-center">
            <h3>{`Quotation No: ${quotationDetails[0].quotation.quotationNumber}`}</h3>
            <h3>{`Customer: ${quotationDetails[0].quotation.customer}`}</h3>
            <h3>{`Status: ${quotationDetails[0].quotation.status}`}</h3>
          </div>

          <Descriptions
            title="Quotation details"
            column={4}
            bordered
            size="small"
          >
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
            {quotationDetails.map((detail) => (
              <>
                <Descriptions.Item>{detail.productName}</Descriptions.Item>
                <Descriptions.Item>{detail.unityCost}</Descriptions.Item>
                <Descriptions.Item>{detail.quantity}</Descriptions.Item>
                <Descriptions.Item>
                  {detail.quantity * detail.unityCost}
                </Descriptions.Item>
              </>
            ))}

            <Descriptions.Item span={4}>Total VAT</Descriptions.Item>
            <Descriptions.Item span={4}>Total</Descriptions.Item>
          </Descriptions>
        </div>
      )}
      {quotationDetails.length === 0 && (
        <>
          <Skeleton />
          <h2>This quotation has no details</h2>
        </>
      )}
    </div>
  );
};

QuotationInfo.layout = "L1";
QuotationInfo.auth = true;
export default QuotationInfo;
