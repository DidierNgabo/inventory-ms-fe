import React from "react";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/api/users");
  const data = await res.json();

  const paths = data.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await fetch(`http://localhost:4000/api/users/${id}`);
  const data = await res.json();

  return {
    props: { user: data },
  };
};

const SingleUser = ({ user }) => {
  return (
    <div className="">
      <h2>{user.name}</h2>
    </div>
  );
};

SingleUser.layout = "L1";

export default SingleUser;
