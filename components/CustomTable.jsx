import React from "react";
import { Button, Table } from "antd";
import Search from "antd/lib/input/Search";
import Link from "next/link";
import {
  FilePdfFilled,
  FilePdfOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SearchInput from "./Search";

const CustomTable = ({ data, columns, addNewLink, pdfLink, param }) => {
  return (
    <div>
      <div className="w-full flex items-center justify-between mt-12 mb-8">
        <div className="">
          <SearchInput data={data} param={param} />
        </div>
        <div className=" flex items-center justify-between">
          {pdfLink && (
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${pdfLink}`}
            >
              <Button
                className="bg-green-600 mr-4"
                style={{ background: "#76CE02", color: "white" }}
                icon={<FilePdfOutlined />}
                size="large"
              >
                Export
              </Button>
            </Link>
          )}

         {  <Link href={addNewLink}>
            <Button type="primary"  icon={<PlusOutlined />} size="large">
              Add New
            </Button>
          </Link>} 
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        size="small"
        rowKey="id"
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
