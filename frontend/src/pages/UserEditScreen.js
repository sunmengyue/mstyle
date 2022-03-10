import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess
  } = userUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/users");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, history, userId, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="form__container">
      <Link to="/admin/users"> ← Go Back</Link>
      <h1 className="h1">Edit User</h1>
      {updateLoading && <Loader />}
      {updateError && <div className="error_msg">{updateError}</div>}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error_msg">{error}</div>
      ) : (
        <form onSubmit={submitHandler} className="form">
          {/* name */}
          <div className="form__field">
            <label htmlFor="name" className="form_label">
              User Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              placeholder="User name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* email */}
          <div className="form__field">
            <label htmlFor="email" className="form_label">
              Email Address
            </label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* is admin */}
          <div className="form-check flex">
            <input
              className="form-check-input h-4 w-4 border border-gray-200 rounded-sm mt-1 mr-3"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              type="checkbox"
              id="isAdmin"
            />
            <label
              className="form-check-label text-gray-800 cursor-pointer"
              htmlFor="isAdmin"
            >
              Is Admin
            </label>
          </div>

          <button
            type="submit"
            className=" bg-black text-white uppercase tracking-widest py-3 px-9"
            onClick={submitHandler}
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
