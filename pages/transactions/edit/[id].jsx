import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useProductContext } from "../../../context/ProductContext";
import { useTransaction } from "../../../context/TransactionContext";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };
  const response = await axios.get(
    `http://localhost:4000/api/transactions/${id}`,
    config
  );
  return {
    props: {
      transaction: response.data,
    },
  };
};

const EditTransaction = ({ transaction }) => {
  const [form] = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useProductContext();
  const { updateTransaction } = useTransaction();

  const token = session?.user?.accessToken;

  if (transaction) {
    form.setFieldsValue({
      ...transaction,
      product: transaction.product.id,
    });
  }

  const onFinish = (values) => {
    try {
      updateTransaction(values, token);
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

  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Edit Transaction
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="id" hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input category name" }]}
          label="Product"
          name="product"
          className="rounded-lg"
        >
          <Select
            showSearch
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

EditTransaction.layout = "L1";
EditTransaction.auth = true;

export default EditTransaction;
