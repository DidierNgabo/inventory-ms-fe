import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRequest } from "../../context/RequestContext";

const newRequest = () => {
  const [form] = useForm();
  const router = useRouter();
  const [coords, setCoords] = useState();
  const { saveRequest } = useRequest();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const success = (pos) => {
    setCoords({ ...pos.coords });
  };

  const error = (err) => {
    message.error(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude, longitude);
        setCoords({ latitude, longitude });
      }
    );
  }, []);

  const onFinish = (values) => {
    try {
      const data = {
        ...values,
        address: coords,
      };
      saveRequest(data, token);
      form.resetFields();
      router.push("/requests");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };
  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Make an online Request
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[
            { required: true, message: "Please enter requested service" },
          ]}
          label="Service"
          name="service"
          className="rounded-lg"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter description of the requested service",
            },
          ]}
          label="description"
          name="description"
          className="rounded-lg"
        >
          <Input.TextArea />
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

newRequest.layout = "L1";
newRequest.auth = true;

export default newRequest;
