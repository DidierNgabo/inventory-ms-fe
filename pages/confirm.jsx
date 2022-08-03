import React from "react";
import Image from "next/image";
import Confirm from "../public/images/confirmation-email.png";
import { Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

export const getServerSideProps = (ctx) => {
  console.log(ctx.query);
  const { token } = ctx.query;

  return {
    props: {
      id: token,
    },
  };
};

const ConfirmEmail = ({ id }) => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/verify/${id}`
      );
      if (response) {
        message.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="h-96 w-1/2 mx-auto text-center">
      <Image height={450} width={800} src={Confirm} />
      <h2 className="text-lg">Email Confirmation</h2>
      <p>You are almost ready {id} to start using Anik Rwanda services</p>
      <p>click the below button to confirm your account</p>
      <Button onClick={handleClick} type="primary" size="large" shape="round">
        Verify
      </Button>
    </div>
  );
};

ConfirmEmail.layout = "L3";

export default ConfirmEmail;
