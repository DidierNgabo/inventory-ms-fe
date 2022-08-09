import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CustomTable from "../../components/CustomTable";

import { getSession } from "next-auth/react";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    "http://localhost:4000/api/quotations",
    config
  );

  return {
    props: {
      quotations: response.data,
    },
  };
};

const Quotations = ({ quotations }) => {
  const router = useRouter();
  const [data, setData] = React.useState(quotations);

  const confirm = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/quotations/${id}`
      );
      if (response) {
        message.success(response.data.message);
        setData(data.filter((quotation) => quotation.id !== id));
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const generatePdf = async (id) => {
    try {
      console.log("working");
      const response = await axios.get(
        `http://localhost:4000/api/quotations/pdf/${id}`
      );
      console.log(response);
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Quotation number",
      dataIndex: "quotationNumber",
      key: "quotationNo",
    },
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
      render: (_, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Link href={`/quotations/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/quotations/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this quotation?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} />
          </Popconfirm>
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotations/pdf/${record.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              onClick={() => generatePdf(record.id)}
              type="ghost"
              icon={<FilePdfOutlined />}
            />
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      {quotations?.length !== 0 && (
        <CustomTable
          data={data}
          columns={columns}
          addNewLink="/quotations/new"
          pdfLink="quotations/pdf"
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
