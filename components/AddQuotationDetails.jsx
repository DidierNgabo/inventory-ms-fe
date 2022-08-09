import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import { useQuotation } from "../context/QuotationContext";
import AdQuotationDetailModal from "./AddQuotationDetailModal";

const AddQuotationDetails = () => {
  const {
    data,
    isNew,
    addNew,
    handleAddNew,
    deleteDetail,
    isEditing,
    onEditDetail,
    handleUpdate,
  } = useQuotation();

  const { data: products } = useProductContext();
  const columns = [
    {
      title: "product name",
      dataIndex: "productName",
      width: "40%",
      editable: true,
    },
    {
      title: "unit cost",
      dataIndex: "unityCost",
      width: "25%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "25%",
      editable: true,
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
    <div className="mt-7">
      <Button
        onClick={addNew}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add New
      </Button>
      <Table dataSource={data} columns={columns} />
      <AdQuotationDetailModal
        title="create New Quotation Detail"
        action={handleAddNew}
        visibility={isNew}
      />
      <AdQuotationDetailModal
        title="update Quotation Detail"
        action={handleUpdate}
        visibility={isEditing}
      />
    </div>
  );
};

export default AddQuotationDetails;
