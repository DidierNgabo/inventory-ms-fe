import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useInspection } from "../../../context/InspectionContext";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    `http://localhost:4000/api/inspections/${id}`,
    config
  );

  return {
    props: {
      inspection: response.data,
    },
  };
};

const EditInspection = ({ inspection }) => {
  const [form] = useForm();
  const router = useRouter();
  const { updateInspection } = useInspection();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  if (inspection) {
    form.setFieldsValue({
      ...inspection,
    });
  }

  const onFinish = (values) => {
    try {
      updateInspection(values, token);
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
        Edit Inspection
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
          label="id"
          hidden
          name="id"
          className="rounded-lg"
        >
          <Input />
        </Form.Item>
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

EditInspection.auth = true;
EditInspection.layout = "L1";

export default EditInspection;
