import { Button, Form, Input, message, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { signIn, getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Login = ({ csrfToken }) => {
  const [form] = useForm();
  const [error, setError] = React.useState(null);
  const router = useRouter();

  if (csrfToken) {
    form.setFieldsValue({
      csrfToken: csrfToken,
    });
  }

  const onFinish = async (values) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setError(res.error);
        message.error("bad credentials", 2);
      } else {
        setError(null);
        message.success("logged in sucessfully", 2);
      }
      if (res.url) router.push(res.url);
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
    <div className="w-full flex items-center justify-center h-screen">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item hidden label="Token" name="csrfToken">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
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

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* <Typography.Link className="mt-8">
        <Link href="/signup"> have no account signup please</Link>
      </Typography.Link> */}
    </div>
  );
};

Login.layout = "L2";

export default Login;

// // This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
