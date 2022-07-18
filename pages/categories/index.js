import React from "react";
import { Button, message, Popconfirm, Spin } from "antd";
import Link from "next/link";
import CustomTable from "../../components/CustomTable";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import UpdateCategoryModal from "../../components/UpdateCategoryModal";
import { useCategoryContext } from "../../context/CategoryContext";
import moment from "moment";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const response = await axios.get(
    "http://localhost:4000/api/categories",
    config
  );

  const data = response.data;

  return {
    props: {
      categories: data,
    },
  };
};

const Categories = ({ categories }) => {
  const [visible, setVisible] = React.useState(false);
  const [editData, setEditData] = React.useState();
  const router = useRouter();
  const { deleteCategory } = useCategoryContext();

  const hideModal = () => {
    setVisible(false);
  };

  const onEdit = (record) => {
    setVisible(true);
    setEditData({ ...record });
  };

  const confirm = (id) => {
    message.info(deleteCategory(id));

    router.reload();
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
      {categories?.length !== 0 && (
        <>
          <CustomTable
            data={categories}
            columns={columns}
            addNewLink="/categories/new"
          />
          <UpdateCategoryModal
            visible={visible}
            category={editData}
            hide={hideModal}
          />
        </>
      )}
      {categories?.length == 0 && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

Categories.auth = true;
Categories.layout = "L1";

export default Categories;
