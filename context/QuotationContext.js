import { message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const QuotationContext = React.createContext();

const QuotationProvider = ({ children }) => {
  const [quotation, setQuotation] = React.useState({
    status: "",
    customer: "",
  });
  const [data, setData] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  const [editingDetail, setEditingDetail] = React.useState(null);

  // const { data, error, isLoaded } = useApiRequest(
  //   "http://localhost:4000/api/quotations"
  // );

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
      unityCost: "",
      quantity: "",
    });
  };

  const handleAddNew = () => {
    const newDetail = {
      id: editingDetail.id,
      productName: editingDetail.productName,
      quantity: parseInt(editingDetail.quantity),
      unityCost: parseInt(editingDetail.unityCost),
    };

    setData([...data, newDetail]);
  };

  const handleUpdate = () => {
    const updatedDetail = {
      id: editingDetail.id,
      productName: editingDetail.productName,
      quantity: parseInt(editingDetail.quantity),
      unityCost: parseInt(editingDetail.unityCost),
    };
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

  const deleteQuotation = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/quotations/${id}`
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateQuotation = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/quotations/${values.id}`,
        values
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onEditDetail = (record) => {
    setIsEditing(true);
    setEditingDetail({ ...record });
  };

  const saveQuotation = async () => {
    try {
      const details = data.map(({ id, ...detail }) => detail);
      const values = {
        status: quotation.status,
        customer: quotation.customer,
        details,
      };

      console.log(values);
      const response = await axios.post(
        "http://localhost:4000/api/quotation-details/full",
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
    deleteQuotation,
    saveQuotation,
    updateQuotation,
    quotation,
    setQuotation,
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
    <QuotationContext.Provider value={value}>
      {children}
    </QuotationContext.Provider>
  );
};

export default QuotationProvider;

export const useQuotation = () => {
  return useContext(QuotationContext);
};
