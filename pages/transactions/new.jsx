import { Button, Form, InputNumber, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useProductContext } from "../../context/ProductContext";
import { useTransaction } from "../../context/TransactionContext";

const NewTransaction = () => {
  const [form] = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useProductContext();
  const { saveTransaction } = useTransaction();

  const token = session?.user?.accessToken;

  const onFinish = (values) => {
    console.log(values);
    try {
      saveTransaction(values, token);
      form.resetFields();
      router.push("/transactions");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const { Option } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Add new Transaction
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[{ required: true, message: "Please input category name" }]}
          label="Product"
          name="product"
          className="rounded-lg"
        >
          <Select
            showSearch
            onChange={handleChange}
            placeholder="Select a product"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {data.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please select transaction type" },
          ]}
          label="Transaction Type"
          name="type"
          className="rounded-lg"
        >
          <Select>
            <Option value="stock in">Stock In</Option>
            <Option value="stock out">Stock Out</Option>
          </Select>
        </Form.Item>
        <Form.Item
          hasFeedback
          rules={[{ required: true, message: "quantity can not be null" }]}
          label="Quantity"
          name="quantity"
        >
          <InputNumber />
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

NewTransaction.auth = true;
NewTransaction.layout = "L1";
export default NewTransaction;
