import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useInspection } from "../../context/InspectionContext";

const NewInspection = () => {
  const [form] = useForm();
  const router = useRouter();
  const { saveInspection } = useInspection();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const onFinish = (values) => {
    try {
      saveInspection(values, token);
      form.resetFields();
      router.push("/inspections");
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
        Add new Inspection
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input problem" }]}
          label="Problem Found"
          name="problem"
          className="rounded-lg"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "Please input comment" }]}
          label="Comment"
          name="comment"
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

NewInspection.auth = true;
NewInspection.layout = "L1";

export default NewInspection;
