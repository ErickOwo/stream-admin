import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import endPoinst from '@api/index';
import { getData } from '@api/requests';

const Users = () => {
  const { data } = useSWR(endPoinst.users.api, getData);

  return (
    <div className="grid md:grid-cols-2 gap-3 p-5">
      {data?.map((user, index) => (
        <div key={index} className="bg-gray-300 p-3 flex flex-col">
          <p>
            Name: <span>{user.name}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            Phone: <span>{user.phone}</span>
          </p>
          <div className="flex gap-2 mt-2">
            <Link href={`/dashboard/users/${user._id}`}>
              <button className="bg-yellow-500 rounded-lg px-2 py-1 w-[80px]">Info...</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
