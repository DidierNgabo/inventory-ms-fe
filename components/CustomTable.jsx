import React from "react";
import { Button, message, Popconfirm, Table, Tag } from "antd";
import Search from "antd/lib/input/Search";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

const CustomTable = ({ data, columns, addNewLink }) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between mt-12 mb-8">
        <div className="w-1/3">
          <Search size="large" placeholder="input search text" enterButton />
        </div>

        <Link href={addNewLink}>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add New
          </Button>
        </Link>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default CustomTable;
