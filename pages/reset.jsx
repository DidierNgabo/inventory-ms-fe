import React from "react";
import Image from "next/image";
import Confirm from "../public/images/confirmation-email.png";
import { Button, Form, Input, message } from "antd";
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

const ResetPassword = ({ id }) => {
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/auth/reset/${id}`,
        values
      );
      if (response) {
        message.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          hasFeedback
          rules={[
            { required: "true", message: "Please input password" },
            { min: 8, message: "Password can not be less than 8 characters" },
          ]}
          label="Password"
          name="oldPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[
            { required: "true", message: "Please input password" },
            { min: 8, message: "Password can not be less than 8 characters" },
          ]}
          label="Password"
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          hasFeedback
          dependencies={["newPassword"]}
          label="Confirm Password"
          name="confirm"
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ResetPassword.layout = "L2";

export default ResetPassword;
