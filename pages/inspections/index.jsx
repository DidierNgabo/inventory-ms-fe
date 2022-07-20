import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Typography } from "antd";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import CustomTable from "../../components/CustomTable";
import { useInspection } from "../../context/InspectionContext";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    "http://localhost:4000/api/inspections",
    config
  );

  return {
    props: {
      inspections: response.data,
    },
  };
};
const Inspections = ({ inspections }) => {
  const [data, setData] = React.useState(inspections);

  const { data: session } = useSession();

  const { deleteInspection } = useInspection();

  const token = session?.user?.accessToken;

  const confirm = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/inspections/${id}`,
        config
      );
      if (response) {
        message.success(response.data.message);
        setData(data.filter((quotation) => quotation.id !== id));
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "DoneBy",
      dataIndex: "doneBy",
      key: "doneBy",
      render: (_, record) => (
        <Link href={`/users/${record.doneBy.id}`}>
          <Typography.Link>{record.doneBy.name}</Typography.Link>
        </Link>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Link href={`/inspections/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/inspections/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this inspection?"
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
    <div>
      <CustomTable
        columns={columns}
        data={data}
        addNewLink="/inspections/new"
      />
    </div>
  );
};

Inspections.layout = "L1";
Inspections.auth = true;

export default Inspections;
