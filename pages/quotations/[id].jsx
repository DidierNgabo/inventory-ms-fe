import React from "react";

import { getSession } from "next-auth/react";
import axios from "axios";
import { Button, Descriptions, Skeleton } from "antd";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

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
  console.log(process.env.NEXT_PUBLIC_FLUTTER_API_KEY);
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTER_API_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: "RWF",
    payment_options: "mobilemoney",
    customer: {
      email: "diddynu2000@gmail.com",
      phonenumber: "250787524967",
      name: "quizera eric",
    },
    customizations: {
      title: "Anik System",
      description: "Payment for the given quotation",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuSfeVjT2F9g-pnY-W4Wjul5WRVNFLayjl0X739Pxuf3t1JYGZry2hdvWM-jXRv1HDtM&usqp=CAU",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="form-card">
      <div>
        <Button
          type="primary"
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                closePaymentModal(); // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }}
        >
          Pay QUOTATION
        </Button>
      </div>
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
