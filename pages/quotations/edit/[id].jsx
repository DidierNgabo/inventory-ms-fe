import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Skeleton,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { getSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import EditQuotationDetailModal from "../../../components/EditQuotationDetailModal";
import { useUserContext } from "../../../context/UserContext";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const session = await getSession(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };
  const response = await axios.get(
    `http://localhost:4000/api/quotation-details/quotation/${id}`,
    config
  );
  return {
    props: {
      quotationDetails: response.data,
    },
  };
};

const EditQuotation = ({ quotationDetails }) => {
  const [form] = useForm();
  const { data } = useUserContext();
  const { Option } = Select;
  const [details, setDetails] = useState(quotationDetails);
  const [editingDetail, setEditingDetail] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  if (details) {
    form.setFieldsValue({ ...details[0].quotation });
  }

  const updateQuotation = async () => {
    try {
      const record = form.getFieldsValue();
      const response = await axios.put(
        `http://localhost:4000/api/quotations/${record.id}`,
        record
      );

      if (response) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotation-details/${record.id}`
      );
      setDetails((pre) => {
        return pre.filter(
          (detail) => detail.productName !== record.productName
        );
      });
      message.success(response.data.message);
    } catch (error) {
      message.error(error);
    }
  };

  const onEditDetail = (record) => {
    setIsEditing(true);
    setEditingDetail({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingDetail(null);
  };

  return (
    <div className="form-card">
      {details.length > 0 && (
        <div>
          <div className="flex w-4/5 justify-between items-center">
            <Form
              form={form}
              layout="vertical"
              className="grid grid-cols-3 w-full gap-2"
            >
              <Form.Item
                rules={[{ required: true, message: "status" }]}
                label="id"
                name="id"
                hidden
              >
                <Input className="rounded-lg h-8 w-4/5" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "status" }]}
                label="Status"
                name="status"
                style={{ height: "5rem", borderRadius: "0.4rem" }}
              >
                <Input className="rounded-lg h-8 w-4/5" />
              </Form.Item>

              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select user",
                  },
                ]}
                label="Customer"
                name="customer"
              >
                <Select
                  showSearch
                  placeholder="Select Customer"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {data.map((customer) => (
                    <Option value={customer.name}>{customer.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>

          {/* <Button
            onClick={addNew}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add New
          </Button> */}

          <Descriptions
            title="Quotation details"
            column={5}
            bordered
            size="small"
          >
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Product
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold border-blue-500">
              Price
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Quantity
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Total
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              <h2 className="text-white font-bold">Action</h2>
            </Descriptions.Item>
            {details.map((detail) => (
              <>
                <Descriptions.Item>{detail.productName}</Descriptions.Item>
                <Descriptions.Item>{detail.unityCost}</Descriptions.Item>
                <Descriptions.Item>{detail.quantity}</Descriptions.Item>
                <Descriptions.Item>
                  {detail.quantity * detail.unityCost}
                </Descriptions.Item>
                <Descriptions.Item>
                  <div className="w-4/5 flex items-start justify-between">
                    <Button
                      type="ghost"
                      onClick={() => onEditDetail(detail)}
                      icon={<EditOutlined />}
                    />

                    <Popconfirm
                      title="Are you sure to delete this order detail?"
                      onConfirm={() => handleDelete(detail)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="ghost" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                </Descriptions.Item>
              </>
            ))}
          </Descriptions>
          <EditQuotationDetailModal
            title="edit Quotation Detail"
            visibility={isEditing}
            detail={editingDetail}
            reset={resetEditing}
            setDetails={setDetails}
          />

          <Button onClick={updateQuotation} type="primary" className="my-4">
            Update
          </Button>
        </div>
      )}
      {quotationDetails.length === 0 && (
        <>
          <Skeleton />
          <h2>This quotation has no details</h2>
        </>
      )}
    </div>
  );
};

export default EditQuotation;

EditQuotation.layout = "L1";
EditQuotation.auth = true;
