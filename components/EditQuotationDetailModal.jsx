import { Form, Input, message, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import React from "react";

const EditQuotationDetailModal = ({
  detail,
  reset,
  visibility,
  setDetails,
}) => {
  const [form] = useForm();

  if (detail) {
    form.setFieldsValue({
      id: detail.id,
      productName: detail.productName,
      unityCost: detail.unityCost,
      quantity: detail.quantity,
    });
  }

  const handleUpdate = async () => {
    try {
      const record = form.getFieldsValue();
      const data = {
        ...record,
        quantity: Number(record.quantity),
        unityCost: Number(record.unityCost),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotation-details/${record.id}`,
        data
      );
      setDetails((pre) => {
        return pre.map((record) => {
          if (record.id === detail.id) {
            return data;
          } else {
            return detail;
          }
        });
      });
      // message.success(response.data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title="Edit Quotation Detail"
        visible={visibility}
        okText="Save"
        onCancel={() => {
          reset();
        }}
        onOk={() => {
          handleUpdate();
          reset();
        }}
      >
        <Form layout="vertical" form={form} autoComplete="false">
          <Form.Item
            label="id"
            name="id"
            hiddens
            rules={[{ required: true, message: "product name required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="product name"
            name="productName"
            rules={[{ required: true, message: "product name required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="unit price"
            name="unityCost"
            rules={[{ required: true, message: "unit price required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: "quantity required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditQuotationDetailModal;
