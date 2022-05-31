import React from "react";
import { Button, Table } from "antd";
import Search from "antd/lib/input/Search";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import SearchInput from "./Search";

const CustomTable = ({ data, columns, addNewLink }) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between mt-12 mb-8">
        <div className="w-1/3">
          <SearchInput data={data} />
        </div>

        <Link href={addNewLink}>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Add New
          </Button>
        </Link>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />
    </div>
  );
};

export default CustomTable;
