import React from "react";

const AccountLayout = ({ children }) => {
  return (
    <div className="w-full flex min-h-screen items-center justify-evenly">
      <div className="w-full  flex items-center justify-center bg-blue-800  rounded-r-full text-center h-screen">
        <div>
          <h1 className="text-white font-mono font-bold  text-xl">
            Household Management System
          </h1>
          <p className="text-white font-mono font-semibold  text-lg">
            Anik Rwanda
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AccountLayout;
