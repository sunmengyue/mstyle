import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  PencilAltIcon,
  XIcon,
  CheckIcon,
  TrashIcon
} from "@heroicons/react/solid";

const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users);
  const { loading: loadingUsers, error: errorUsers, users } = usersList;

  useEffect(() => {
    dispatch(getusers());
  }, []);
  return (
    <div className="max-w-7xl m-auto p-5 md:flex md:justify-between">
      <div className="flex-grow">
        <h1 className="uppercase tracking-widest text-3xl mb-10">Users</h1>
        {loadingUsers ? (
          <Loader />
        ) : errorUsers ? (
          <div className="error_msg">{errorUsers}</div>
        ) : (
          <table className="border w-full">
            <thead>
              <tr className="border">
                <th className="th">Id</th>
                <th className="th">Name</th>
                <th className="th">Email</th>
                <th className="th">Admin</th>
                <th className="th">Edit</th>
              </tr>
            </thead>
            <tbody className="nth-child:bg-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="td">{user._id}</td>
                  <td className="td">{user.name}</td>
                  <td className="td">{user.email}</td>
                  <td className="text-left p-2 border-r">
                    {user.isAdmin ? (
                      <CheckIcon className="h-5 text-green-700" />
                    ) : (
                      <XIcon className="h-5 text-red-700" />
                    )}
                  </td>
                  <td className="flex p-2 items-center">
                    <PencilAltIcon className="h-5 pr-2 cursor-pointer text-gray-400 hover:text-gray-600 ease-transform transition-colors ease-out" />
                    <TrashIcon className="h-5 cursor-pointer text-red-300 hover:text-red-700 transform transition-colors ease-out" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
