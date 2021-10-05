import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { XIcon } from '@heroicons/react/solid';

const Profile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, password }));
    }
  };

  return (
    <div className="max-w-7xl m-auto p-5 md:flex md:justify-between">
      <div className="mb-8 w-full mr-8 md:w-1/2 lg:w-1/3">
        {success && <div className="primary_msg mb-5">Profile Updated</div>}
        <h1 className="text-3xl uppercase tracking-widest mb-5">
          User Profile
        </h1>
        {message && <div className="error_msg">{message}</div>}
        {error && <div className="error_msg">{error}</div>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="form">
          {/* name */}
          <div className="form__field">
            <label htmlFor="name" className="mb-3">
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
            <label htmlFor="email" className="mb-3">
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

          {/* password */}
          <div className="form__field">
            <label htmlFor="password" className="mb-3">
              Password
            </label>
            <input
              className="input mb-5"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* confirm password */}
          <div className="form__field">
            <label htmlFor="confirmPassword" className="mb-3">
              Confirm Password
            </label>
            <input
              className="input mb-5"
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className=" bg-black text-white uppercase tracking-widest py-3 px-9"
            onClick={submitHandler}
          >
            Update
          </button>
        </form>
      </div>

      {/* right side table */}
      <div className="flex-grow">
        <h1 className="uppercase tracking-widest text-3xl mb-10">My orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <div className="error_msg">{errorOrders}</div>
        ) : (
          <table className="border w-full">
            <thead>
              <tr className="border">
                <th className="th">Id</th>
                <th className="th">total</th>
                <th className="th">paid</th>
                <th className="th">Dilivered</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody className="nth-child:bg-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="td">{order._id}</td>
                  <td className="td">{order.totalPrice}</td>
                  <td className="td">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <XIcon className="h-5 text-red-700" />
                    )}
                  </td>
                  <td className="text-left p-2 border-r">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <XIcon className="h-5 text-red-700" />
                    )}
                  </td>
                  <td className="td link">
                    <Link to={`/order/${order._id}`}>Details</Link>
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

export default Profile;
