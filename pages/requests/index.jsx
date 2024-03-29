import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Tag, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import CustomTable from "../../components/CustomTable";
import jwt from "jwt-decode";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    "http://localhost:4000/api/requests",
    config
  );

  return {
    props: {
      requests: response.data,
    },
  };
};
const Requests = ({ requests }) => {
  const [data, setData] = React.useState(requests);

  const { data: session } = useSession();

  const token = session?.user?.accessToken;

  let user = null;

  if (token) {
    user = jwt(token);
  }

  const confirm = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/requests/${id}`,
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

  const markInspected = async (record) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const inspected = {...record,status:'inspected'};
      const response = await axios.patch(
        `http://localhost:4000/api/requests/${record.id}`,inspected,
        config
      );
      if (response) {
        message.success("request status changed successfully");
        setData((pre) => {
          return pre.map((transaction) => {
            if (transaction.id === record.id) {
              return record;
            } else {
              return transaction;
            }
          });
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "ReqNo",
      dataIndex: "reqNo",
      key: "reqNo",
      sorter: (a, b) => a.reqNo.localeCompare(b.reqNo),
      sortDirections: ["descend"],
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
      sortDirections: ["descend"],
      render: (_, record) => (
        <Link href={`/users/${record.customer.id}`}>
          <Typography.Link>{record.customer.name}</Typography.Link>
        </Link>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Assigned To",
    //   dataIndex: "assignedTo",
    //   key: "assignedTo",
    //   render: (_, record) => (
    //     <Link href={`/users/${record.assignedTo.id}`}>
    //       <Typography.Link>{record.assignedTo.name}</Typography.Link>
    //     </Link>
    //   ),
    // },
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
          <Link href={`/requests/edit/${record.id}`}>
            <Button type="ghost" icon={<EditOutlined />} />
          </Link>

          <Link href={`/requests/${record.id}`}>
            <Button type="ghost" icon={<EyeOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this online request?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} />
          </Popconfirm>
          { user.role.name !=='customer' &&
          <Popconfirm
            title="Mark as Inspected?"
            onConfirm={() => markInspected(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<CheckOutlined />} />
          </Popconfirm>
         }
        </div>
      ),
    },
  ];
  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        param="reqNo"
        addNewLink="/requests/new"
      />
      {/* <RequestMap /> */}
    </div>
  );
};

Requests.layout = "L1";
Requests.auth = true;

export default Requests;
