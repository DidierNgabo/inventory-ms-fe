import { Form, Input, Modal } from "antd";
import React from "react";
import { useQuotation } from "../context/QuotationContext";

const AdQuotationDetailModal = ({ title, action, visibility }) => {
  const { setEditingDetail, editingDetail, resetEditing } = useQuotation();

  console.log(editingDetail);

  return (
    <div>
      <Modal
        title={title}
        visible={visibility}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          action();
          resetEditing();
        }}
      >
        <Form layout="vertical" autoComplete="false">
          <Form.Item
            label="product name"
            name="productName"
            rules={[{ required: true, message: "product name required" }]}
          >
            <Input
              value={editingDetail?.productName}
              onChange={(e) => {
                setEditingDetail((pre) => {
                  return { ...pre, productName: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="unit price"
            name="unityCost"
            rules={[{ required: true, message: "unit price required" }]}
          >
            <Input
              value={editingDetail?.unityCost}
              onChange={(e) => {
                setEditingDetail((pre) => {
                  return { ...pre, unityCost: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: "quantity required" }]}
          >
            <Input
              value={editingDetail?.quantity}
              onChange={(e) => {
                setEditingDetail((pre) => {
                  return { ...pre, quantity: e.target.value };
                });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdQuotationDetailModal;
