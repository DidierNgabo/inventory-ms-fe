import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useRole } from "../../context/RoleContext";

const NewRole = () => {
  const [form] = useForm();
  const router = useRouter();
  const { saveRole } = useRole();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const onFinish = (values) => {
    try {
      saveRole(values, token);
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
        Add new Role
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

NewRole.auth = true;
NewRole.layout = "L1";

export default NewRole;
