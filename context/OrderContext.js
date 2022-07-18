import { message } from "antd";
import axios from "axios";
import React from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const OrderContext = React.createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = React.useState({
    status: "",
    customer: "",
  });
  const [data, setData] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  const [editingDetail, setEditingDetail] = React.useState(null);

  const deleteDetail = (record) => {
    setData((pre) => {
      return pre.filter((detail) => detail.productName !== record.productName);
    });
  };

  const addNew = () => {
    setIsNew(true);
    setEditingDetail({
      id: parseInt(Math.random() * 1000),
      productName: "",
      price: "",
      discount: "",
    });
  };

  const handleAddNew = () => {
    const newDetail = {
      id: editingDetail.id,
      productName: editingDetail.productName,
      discount: parseInt(editingDetail.discount),
      price: parseInt(editingDetail.price),
    };

    setData([...data, newDetail]);
  };

  const handleUpdate = () => {
    const updatedDetail = {
      id: editingDetail.id,
      productName: editingDetail.productName,
      discount: parseInt(editingDetail.discount),
      price: parseInt(editingDetail.price),
    };
    console.log("in update");
    setData((pre) => {
      return pre.map((detail) => {
        if (detail.id === editingDetail.id) {
          return updatedDetail;
        } else {
          return detail;
        }
      });
    });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setIsNew(false);
    setEditingDetail(null);
  };

  const onEditDetail = (record) => {
    setIsEditing(true);
    setEditingDetail({ ...record });
  };

  const deleteOrder = async (id, config) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/orders/${id}`,
        config
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateOrder = async (values, config) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/Orders/${values.id}`,
        values,
        config
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveOrder = async () => {
    try {
      const details = data.map(({ id, ...detail }) => detail);
      const values = {
        status: order.status,
        customer: order.customer,
        details,
      };

      console.log(values);
      const response = await axios.post(
        "http://localhost:4000/api/order-details/full",
        values
      );

      if (response) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const value = {
    data,
    setData,
    deleteOrder,
    order,
    setOrder,
    saveOrder,
    updateOrder,
    isNew,
    setIsNew,
    isEditing,
    setIsEditing,
    editingDetail,
    setEditingDetail,
    addNew,
    handleAddNew,
    resetEditing,
    onEditDetail,
    deleteDetail,
    handleUpdate,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;

export const useOrderContext = () => {
  return React.useContext(OrderContext);
};
