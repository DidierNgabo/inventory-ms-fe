import React from "react";
import AddQuotation from "../../components/AddQuotation";
import AddQuotationDetails from "../../components/AddQuotationDetails";
import QuotationStepPanel from "../../components/QuotationStepPanel";

const NewQuotation = () => {
  const steps = [
    {
      step: 1,
      title: "Quotation Info",
      content: <AddQuotation />,
    },
    {
      step: 2,
      title: "Quotation Details",
      content: <AddQuotationDetails />,
    },
  ];

  return (
    <div className="form-card">
      <h2 className="text-center mb-10 mt-3 text-xl font-semibold">
        Create New Quotation
      </h2>
      <QuotationStepPanel steps={steps} />
    </div>
  );
};

export default NewQuotation;

NewQuotation.layout = "L1";
NewQuotation.auth = true;
