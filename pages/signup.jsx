import { Button, Form, Input, message, Typography } from "antd";
import React, { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Signup = () => {
  const [form] = useForm();
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:4000/auth/register/",
        { ...values, role: "6" }
      );
      if (response) {
        
        message.success(
          "User created successfully,Please check your email to confirm"
        );
        form.resetFields();
        setloading(false);
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
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl">Signup</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="w-4/5"
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
          <Button type="primary" loading={loading} className="w-full" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>

      
        <Link href="/login">Already have an account login please</Link>
      
    </div>
  );
};

Signup.layout = "L2";

export default Signup;
