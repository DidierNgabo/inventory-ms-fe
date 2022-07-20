import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useRequest } from "../../../context/RequestContext";

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

const EditRequest = ({ request }) => {
  const [form] = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const { updateRequest } = useRequest();

  const token = session?.user?.accessToken;

  if (request) {
    form.setFieldsValue({
      ...request,
    });
  }

  const onFinish = (values) => {
    try {
      updateRequest(values, token);
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
        <Form.Item label="id" hidden name="id">
          <Input />
        </Form.Item>
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

EditRequest.auth = true;
EditRequest.layout = "L1";

export default EditRequest;
