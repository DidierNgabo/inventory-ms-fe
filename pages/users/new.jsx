import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const newUser = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register/",
        values
      );
      if (response) {
        message.success("User created successfully");
        form.resetFields();
        router.push("/users");
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo);
  };

  return (
    <div className="w-3/5 mx-auto">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Add new User
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input your username" }]}
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[
            { type: "email", message: "Please enter a valid email" },
            { required: true, message: "Please input your email" },
          ]}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[
            { required: "true", message: "Please input password" },
            { min: 8, message: "Password can not be less than 8 characters" },
          ]}
          label="Password"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          hasFeedback
          dependencies={["password"]}
          label="Confirm Password"
          name="confirm"
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
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

newUser.layout = "L1";

export default newUser;
