import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React from "react";
import { useCategoryContext } from "../context/CategoryContext";

const UpdateCategoryModal = ({ category, visible, hide }) => {
  const { updateCategory } = useCategoryContext();
  const [form] = useForm();
  const router = useRouter();

  if (category) {
    form.setFieldsValue({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  }

  const onFinish = (values) => {
    try {
      updateCategory(values);
      form.resetFields();
      hide();
      router.push("/categories");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Modal
      title="Update Category"
      centered
      visible={visible}
      onOk={hide}
      okText="Submit"
      onCancel={hide}
      width={1000}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="id" hidden name="id">
          <Input hidden />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input category name" }]}
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[
            { required: true, message: "Please input category description" },
          ]}
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
    </Modal>
  );
};

export default UpdateCategoryModal;
