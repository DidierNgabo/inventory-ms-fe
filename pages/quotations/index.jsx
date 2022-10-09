import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Spin, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CustomTable from "../../components/CustomTable";

import { getSession,useSession } from "next-auth/react";
import jwt from "jwt-decode";

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
  const [data, setData] = React.useState(quotations);
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.accessToken;

  let user = null;

  if (token) {
    user = jwt(token);
  }

  console.log(user);

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
      const response = await axios.get(
        `http://localhost:4000/api/quotations/pdf/${id}`
      );
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
      render: (_, record) => (
        <Link href={`/users/${record.customer.id}`}>
          <Typography.Link>{record.customer.name}</Typography.Link>
        </Link>
      ),
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
      {quotations && (
        <CustomTable
          data={data}
          columns={columns}
          addNewLink="/quotations/new"
          pdfLink="quotations/pdf"
        />
      )}

      {!quotations && (
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
