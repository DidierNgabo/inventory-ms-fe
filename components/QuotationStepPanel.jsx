import { Button, Steps, message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useQuotation } from "../context/QuotationContext";

const QuotationStepPanel = ({ steps, form }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const { saveQuotation } = useQuotation();

  const handleSubmit = () => {
    saveQuotation();
    router.push("/quotations");
  };

  const next = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const prev = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  };

  return (
    <div>
      <Steps current={activeStep}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} form={form} />
        ))}
      </Steps>
      {steps.map((item) => (
        <div
          className={`steps-content ${
            item.step !== activeStep + 1 && "hidden"
          }`}
        >
          {item.content}
        </div>
      ))}
      <div className="steps-action mt-4">
        {activeStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {activeStep > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuotationStepPanel;
