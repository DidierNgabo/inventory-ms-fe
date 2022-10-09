import React from "react";

import { getSession } from "next-auth/react";
import axios from "axios";
import { Button, Descriptions, message, Skeleton } from "antd";

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
  const total = quotationDetails.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.unityCost;
  }, 0);

  const maxTotal = total + total * 0.18;

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTER_API_KEY,
    tx_ref: Date.now(),
    amount: maxTotal,
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

  const handleClick = () => {
    const response = axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotations/${quotationDetails[0].quotation.id}`,
      {
        status: "accepted",
      }
    );

    if (response) {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
      });
    }
  };

  const handleReject = () => {
    const response = axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotations/${quotationDetails[0].quotation.id}`,
      {
        status: "rejected",
      }
    );

    if (response) {
      message.info("Quotation Rejected");
    }
  };

  return (
    <div className="form-card">
      <div className="flex w-72 items-center justify-between">
        <Button type="primary" onClick={handleClick}>
          Accept and Pay
        </Button>

        <Button type="primary" danger onClick={handleReject}>
          Reject
        </Button>
      </div>
      {quotationDetails.length > 0 && (
        <div className="mt-5">
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
                <Descriptions.Item>
                  {detail.unityCost.toLocaleString()} Rwf
                </Descriptions.Item>
                <Descriptions.Item>{detail.quantity}</Descriptions.Item>
                <Descriptions.Item>
                  {(detail.quantity * detail.unityCost).toLocaleString()} Rwf
                </Descriptions.Item>
              </>
            ))}

            <Descriptions.Item span={3}>Total VAT</Descriptions.Item>
            <Descriptions.Item>
              {(total * 0.18).toLocaleString()} Rwf
            </Descriptions.Item>
            <Descriptions.Item span={3}>Total</Descriptions.Item>
            <Descriptions.Item>
              {maxTotal.toLocaleString()} Rwf
            </Descriptions.Item>
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
