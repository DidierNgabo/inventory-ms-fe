import { Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useQuotation } from "../context/QuotationContext";
import { useUserContext } from "../context/UserContext";

const EditQuotation = ({ quote }) => {
  const { data } = useUserContext();
  const { setQuotation } = useQuotation();
  const [form] = useForm();

  if (quote) {
    form.setFieldsValue({
      ...quote,
    });
  }

  const handleInputChange = () => {
    setQuotation({
      ...form.getFieldsValue(),
    });
  };
  return (
    <div className="mt-5 w-4/5 mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <Form form={form}>
          <Form.Item
            rules={[{ required: true, message: "status" }]}
            label="id"
            name="id"
            style={{ height: "5rem", borderRadius: "0.4rem" }}
          >
            <Input
              onChange={handleInputChange}
              className="rounded-lg h-8 w-4/5"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "status" }]}
            label="Status"
            name="status"
            style={{ height: "5rem", borderRadius: "0.4rem" }}
          >
            <Input
              onChange={handleInputChange}
              className="rounded-lg h-8 w-4/5"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select user",
              },
            ]}
            label="Customer"
            name="customer"
          >
            <Select
              showSearch
              onChange={handleInputChange}
              placeholder="Select Customer"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {data.map((customer) => (
                <Option value={customer.name}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditQuotation;
