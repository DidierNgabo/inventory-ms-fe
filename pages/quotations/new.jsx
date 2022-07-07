import { Button, Form, Input, InputNumber, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React from "react";

const NewQuotation = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFinish = (values) => {
    try {
      console.log(values);
      saveProduct(values);
      form.resetFields();
      router.push("/products");
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
    <div className="w-4/5 mx-auto">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Add new Product
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="grid grid-cols-2 gap-4"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input customer name" }]}
          label="Customer Name"
          name="customer"
          style={{ height: "5rem", borderRadius: "0.4rem" }}
        >
          <Input className="rounded-lg h-8 w-4/5" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please input product description" },
          ]}
          label="Description"
          name="description"
          className="rounded-lg"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "Please input amount in stock" }]}
          label="Amount in stock"
          name="amountInStock"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input product reorder quantity",
            },
          ]}
          label="Reoder Quantity"
          name="reorderQuantity"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input product max stock",
            },
          ]}
          label="Max Stock"
          name="maximumStock"
        >
          <InputNumber />
        </Form.Item>

        {/* <Form.Item
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input product category",
            },
          ]}
          label="Category"
          name="categoryId"
        >
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {data.map((category) => (
              <Option value={category.id}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item> */}

        <Form.Item className="col-span-2 w-1/2 mx-auto">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewQuotation;

NewQuotation.layout = "L1";
NewQuotation.auth = true;
