import { Input, Modal } from "antd";
import React from "react";
import { useQuotation } from "../context/QuotationContext";

const AdQuotationDetailModal = ({ title, action, visibility }) => {
  const { setEditingDetail, editingDetail, resetEditing } = useQuotation();
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
        <Input
          value={editingDetail?.productName}
          onChange={(e) => {
            setEditingDetail((pre) => {
              return { ...pre, productName: e.target.value };
            });
          }}
        />
        <Input
          value={editingDetail?.unityCost}
          onChange={(e) => {
            setEditingDetail((pre) => {
              return { ...pre, unityCost: e.target.value };
            });
          }}
        />
        <Input
          value={editingDetail?.quantity}
          onChange={(e) => {
            setEditingDetail((pre) => {
              return { ...pre, quantity: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
};

export default AdQuotationDetailModal;
