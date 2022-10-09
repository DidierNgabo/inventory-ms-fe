import { Button, Form, Input, message, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { signIn, getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = ({ csrfToken }) => {
  const [form] = useForm();
  const [error, setError] = React.useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  if (csrfToken) {
    form.setFieldsValue({
      csrfToken: csrfToken,
    });
  }

  const onFinish = async (values) => {
    try {
      setloading(true)
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setloading(false);
        setError(res.error);
        message.error("bad credentials", 2);
      } else {
        setloading(false);
        setError(null);
        message.success("logged in sucessfully", 2);
      }
      if (res.url) router.push(res.url);
    } catch (error) {
      setloading(false);
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl">Login</h2>
      <Form
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="w-4/5"
        autoComplete="off"
      >
        <Form.Item hidden label="Token" name="csrfToken">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          className=""
          rules={[
            {
              required: true,
              message: "Please input your  email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary"   className="w-full"  htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

        <Link href="/signup"> Don't have an account signup please</Link>
      
    </div>
  );
};

Login.layout = "L2";

export default Login;

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
