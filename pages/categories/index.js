import { CategoriesContext } from "../../context/CategoryContext";
import React from "react";
import { Button, message, Popconfirm, Spin } from "antd";
import Link from "next/link";
import CustomTable from "../../components/CustomTable";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Categories = () => {
  const { data, error, isLoaded, deleteCategory } =
    React.useContext(CategoriesContext);

  const router = useRouter();

  const [categories, setCategories] = React.useState(data);

  const confirm = (id) => {
    message.info(deleteCategory(id));

    router.reload();

    console.log(response);
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
      render: (text, record) => (
        <div className="w-1/2 flex items-start justify-between">
          <Link href="/users/edit/">
            <Button type="ghost" icon={<EditOutlined />} size="small" />
          </Link>
          <Button type="ghost" icon={<EyeOutlined />} size="small" />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoaded && (
        <CustomTable
          data={data}
          columns={columns}
          addNewLink="/categories/new"
        />
      )}
      {!isLoaded && (
        <div className="h-full flex items-center text-2xl justify-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

Categories.layout = "L1";

export default Categories;
