import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";
import CustomTable from "../../components/CustomTable";

export const getServerSideProps = async (ctx) => {
  const response = await axios.get("http://localhost:4000/api/quotations");

  return {
    props: {
      quotations: response.data,
    },
  };
};

const Quotations = ({ quotations }) => {
  const columns = [
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (text, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Button
            type="ghost"
            onClick={() => onEdit(record)}
            icon={<EditOutlined />}
          />
          <Link href={`/categories/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => confirm(record.id)}
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
    <>
      {quotations?.length !== 0 && (
        <CustomTable
          data={quotations}
          columns={columns}
          addNewLink="/quotations/new"
        />
      )}

      {quotations?.length == 0 && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default Quotations;

Quotations.layout = "L1";
Quotations.auth = true;
