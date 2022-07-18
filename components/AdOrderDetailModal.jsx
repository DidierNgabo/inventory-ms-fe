import { Input, Modal } from "antd";
import React from "react";
import { useOrderContext } from "../context/OrderContext";

const AdOrderDetailModal = ({ title, action, visibility }) => {
  const { setEditingDetail, editingDetail, resetEditing } = useOrderContext();
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
          value={editingDetail?.price}
          onChange={(e) => {
            setEditingDetail((pre) => {
              return { ...pre, price: e.target.value };
            });
          }}
        />
        <Input
          value={editingDetail?.discount}
          onChange={(e) => {
            setEditingDetail((pre) => {
              return { ...pre, discount: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
};

export default AdOrderDetailModal;
