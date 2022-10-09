import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React from "react";

const UpdateCategoryModal = ({ category, visible, hide,updateCategory }) => {
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
      okButtonProps={{style:{display:'none'}}}
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
