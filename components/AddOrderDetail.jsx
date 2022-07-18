import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useOrderContext } from "../context/OrderContext";
import AdOrderDetailModal from "./AdOrderDetailModal";

const AddOrderDetail = () => {
  const {
    data,

    isNew,
    addNew,
    handleAddNew,
    deleteDetail,
    isEditing,
    onEditDetail,
    handleUpdate,
  } = useOrderContext();

  const columns = [
    {
      title: "product name",
      dataIndex: "productName",
      width: "40%",
    },
    {
      title: "price",
      dataIndex: "price",
      width: "25%",
    },
    {
      title: "discount",
      dataIndex: "discount",
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Button
            type="ghost"
            onClick={() => onEditDetail(record)}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Are you sure to delete this order detail?"
            onConfirm={() => deleteDetail(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Button onClick={addNew}>ADD New</Button>
      <Table columns={columns} dataSource={data} />
      <AdOrderDetailModal
        title="create New Order Detail"
        action={handleAddNew}
        visibility={isNew}
      />
      <AdOrderDetailModal
        title="update Order Detail"
        action={handleUpdate}
        visibility={isEditing}
      />
    </div>
  );
};

export default AddOrderDetail;
