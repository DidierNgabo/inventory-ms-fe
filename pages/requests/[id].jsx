import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";
import RequestMap from "../../components/RequestMap";
import Image from "next/image";
import locationImg from "../../public/images/location.png";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };
  const response = await axios.get(
    `http://localhost:4000/api/requests/${id}`,
    config
  );
  return {
    props: {
      request: response.data,
    },
  };
};

const ViewRequest = ({ request }) => {
  return (
    <div className="bg-white w-11/12  flex items-start p-3 justify-between">
      <RequestMap address={request.address} />
      <div className="w-2/5 shadow-md p-2">
        <Image src={locationImg} alt="location" />
        <h2 className="text-lg">{`customer: ${request.customer.name}`}</h2>
        <p>{`service: ${request.service}`}</p>
        <p>{`description:${request.description}`}</p>
      </div>
    </div>
  );
};

ViewRequest.auth = true;
ViewRequest.layout = "L1";

export default ViewRequest;
