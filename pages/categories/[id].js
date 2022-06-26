import React from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const res = await fetch(`http://localhost:4000/api/categories/${id}`);
  const data = await res.json();

  return {
    props: { category: data },
  };
};

const viewCategory = ({ category }) => {
  return (
    <div className="">
      <h2>{category.name}</h2>
    </div>
  );
};

viewCategory.auth = true;
viewCategory.layout = "L1";

export default viewCategory;
