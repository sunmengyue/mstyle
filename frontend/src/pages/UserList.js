import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  PencilAltIcon,
  XIcon,
  CheckIcon,
  TrashIcon
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users);
  const { loading: loadingUsers, error: errorUsers, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getusers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="max-w-7xl m-auto p-5 md:flex md:justify-between">
      <div className="flex-grow overflow-auto`">
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
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <PencilAltIcon className="h-5 pr-2 cursor-pointer text-gray-400 hover:text-gray-600 ease-transform transition-colors ease-out" />
                    </Link>
                    <TrashIcon
                      className="h-5 cursor-pointer text-red-300 hover:text-red-700 transform transition-colors ease-out"
                      onClick={() => deleteHandler(user._id)}
                    />
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
