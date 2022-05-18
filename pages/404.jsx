import Link from "next/link";
import React from "react";
import MainLayout from "../layouts/MainLayout";

const NotFound = () => {
  return (
    <div>
      <h1>Ooops....</h1>
      <h2>Page not Found</h2>
      <p>
        Go back to the{" "}
        <Link href="/">
          <a>Dashboard</a>
        </Link>
      </p>
    </div>
  );
};

NotFound.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default NotFound;
