import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React from "react";
import { CategoriesContext } from "../../context/CategoryContext";

const newCategory = () => {
  const { saveCategory } = React.useContext(CategoriesContext);
  const [form] = useForm();
  const router = useRouter();

  const onFinish = (values) => {
    try {
      saveCategory(values);
      form.resetFields();
      router.push("/categories");
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
    <div className="w-1/3 mx-auto">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Add new Category
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input category name" }]}
          label="Name"
          name="name"
          className="rounded-lg"
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
    </div>
  );
};

newCategory.auth = true;
newCategory.layout = "L1";

export default newCategory;
