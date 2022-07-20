import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import CustomTable from "../../components/CustomTable";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get("http://localhost:4000/api/roles", config);

  return {
    props: {
      roles: response.data,
    },
  };
};
const Roles = ({ roles }) => {
  const [data, setData] = React.useState(roles);

  const { data: session } = useSession();

  const token = session?.user?.accessToken;

  const confirm = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/roles/${id}`,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div className="w-4/5 flex items-start justify-between">
          <Link href={`/roles/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/roles/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this transaction?"
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
      <CustomTable columns={columns} data={data} addNewLink="/roles/new" />
    </div>
  );
};

Roles.layout = "L1";
Roles.auth = true;

export default Roles;
