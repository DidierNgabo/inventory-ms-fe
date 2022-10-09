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

const NewProduct = () => {
  const { data } = useCategoryContext();
  const { saveProduct } = useProductContext();
  const [form] = useForm();
  const router = useRouter();

  const onFinish = (values) => {
    try {
      saveProduct(values);
      form.resetFields();
      router.push("/products");
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
        Add new Product
      </h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="grid grid-cols-2 gap-4 "
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
        <Form.Item
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input product max stock",
            },
          ]}
          label="Max Stock"
          className="w-full"
          style={{width:"300px"}}
          name="maximumStock"
        >
          <InputNumber className="w-full"  style={{width:"415px"}}/>
        </Form.Item>

        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "Please input amount in stock" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("maximumStock") > value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Amount in stock can not be greater than maximum stock")
              );
            },
          }),
        ]}
          label="Amount in stock"
          name="amountInStock"
        >
          <InputNumber style={{width:"415px"}} />
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
          <Input />
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
          <InputNumber style={{width:"415px"}} />
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

        <Form.Item className="col-span-2 w-full">
          <Button type="primary" style={{width:"415px",margin:"40px 200px"}} htmlType="submit">
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
