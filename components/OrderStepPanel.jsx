import { Button, Steps } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useOrderContext } from "../context/OrderContext";

const OrderStepPanel = ({ steps }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();

  const { saveOrder } = useOrderContext();

  const handleSubmit = () => {
    saveOrder();
    router.push("/orders");
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
          <Steps.Step key={item.title} title={item.title} />
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
      <div className="steps-action">
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

export default OrderStepPanel;
