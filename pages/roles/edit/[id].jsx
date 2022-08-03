import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useRole } from "../../../context/RoleContext";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    `http://localhost:4000/api/roles/${id}`,
    config
  );

  return {
    props: {
      role: response.data,
    },
  };
};

const EditRole = ({ role }) => {
  const [form] = useForm();
  const router = useRouter();
  const { updateRole } = useRole();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  if (role) {
    form.setFieldsValue({
      ...role,
    });
  }

  const onFinish = (values) => {
    try {
      updateRole(values, token);
      form.resetFields();
      router.push("/roles");
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
        Edit Role
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input role name" }]}
          label="id"
          name="id"
          hidden
          className="rounded-lg"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Please input role name" }]}
          label="Name"
          name="name"
          className="rounded-lg"
        >
          <Input />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "Please input role description" }]}
          label="Description"
          name="description"
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

EditRole.auth = true;
EditRole.layout = "L1";

export default EditRole;
