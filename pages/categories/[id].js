import React from "react";
import { getSession } from "next-auth/react";
import { Descriptions, Skeleton } from "antd";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const session = await getSession(context);

  const config = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };
  const res = await fetch(`http://localhost:4000/api/categories/${id}`, config);
  const data = await res.json();

  return {
    props: { category: data },
  };
};

const viewCategory = ({ category }) => {
  return (
    <div className="form-card">
      {category && (
        <div>
          <div className="flex w-4/5 justify-between items-center">
            <h3>{`category: ${category.name}`}</h3>
            <h3>{`Description: ${category.description}`}</h3>
          </div>

          <Descriptions
            title="Products"
            column={2}
            bordered
            size="small"
          >
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Name
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold border-blue-500">
             Price
            </Descriptions.Item>
            {category.products.map((product) => (
              <>
                <Descriptions.Item>{product.name}</Descriptions.Item>
                <Descriptions.Item>{product.price}</Descriptions.Item>
              </>
            ))}
          </Descriptions>
        </div>
      )}
      {!category && (
        <>
          <Skeleton />
          <h2>This category has not products yet</h2>
        </>
      )}
    </div>
  )
};

viewCategory.auth = true;
viewCategory.layout = "L1";

export default viewCategory;
