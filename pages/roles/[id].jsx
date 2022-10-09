import { Descriptions } from 'antd'
import React from 'react'
import axios from 'axios'


export const getServerSideProps = async (ctx) => {
    const { id } = ctx.params;
    const response = await axios.get(
      `http://localhost:4000/api/roles/${id}`,
    );
    return {
      props: {
        role: response.data,
      },
    };
  };

const SingleRole = ({role}) => {
  return (
    <div className="form-card">
      {role && (
        <div>
          <div className="flex w-4/5 justify-between items-center">
            <h3>{`Role: ${role.name}`}</h3>
            <h3>{`Description: ${role.description}`}</h3>
          </div>

          <Descriptions
            title="Users"
            column={2}
            bordered
            size="small"
          >
            <Descriptions.Item className="bg-blue-500 text-white font-semibold">
              Name
            </Descriptions.Item>
            <Descriptions.Item className="bg-blue-500 text-white font-semibold border-blue-500">
             Email
            </Descriptions.Item>
            {role.users.map((user) => (
              <>
                <Descriptions.Item>{user.name}</Descriptions.Item>
                <Descriptions.Item>{user.email}</Descriptions.Item>
              </>
            ))}
          </Descriptions>
        </div>
      )}
      {!role && (
        <>
          <Skeleton />
          <h2>This role has no users yet</h2>
        </>
      )}
    </div>
  )
}

export default SingleRole

SingleRole.layout="L1";
SingleRole.auth=true