import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React from "react";
import { useCategoryContext } from "../../context/CategoryContext";
import { useProductContext } from "../../context/ProductContext";

const { Option } = Select;
const selectAfter = (
  <Select defaultValue="days" className="">
    <Option value="days">Days</Option>
    <Option value="weeks">Weeks</Option>
    <Option value="months">Months</Option>
    <Option value="years">Years</Option>
  </Select>
);

const NewProduct = () => {
  const { data } = useCategoryContext();
  const { saveProduct } = useProductContext();
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
    <div className="form-card">
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
          rules={[{ required: true, message: "Please input product name" }]}
          label="Name"
          name="name"
          className="rounded-lg"
        >
          <Input />
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
          rules={[{ required: true, message: "Please select VAT" }]}
          label="VAT inclusive"
          name="vat"
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "Please input product warranty" }]}
          label="Warranty"
          name="warranty"
        >
          <Input addonAfter={selectAfter} />
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

        <Form.Item
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
        </Form.Item>

        <Form.Item className="col-span-2 w-1/2 mx-auto">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

NewProduct.layout = "L1";
NewProduct.auth = true;

export default NewProduct;
