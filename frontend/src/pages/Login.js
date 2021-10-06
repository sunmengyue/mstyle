import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="form__container">
      <h1 className="h1">Sign in</h1>
      {error && <div className="error_msg">{error}</div>}
      {loading && <Loader />}

      {/* email */}
      <form onSubmit={submitHandler} className="form">
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

        {/* password */}
        <div className="form__field">
          <label htmlFor="password" className="form_label">
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
        <button
          type="submit"
          className=" bg-black text-white uppercase tracking-widest py-3 px-9"
          onClick={submitHandler}
        >
          Sign In
        </button>
      </form>
      <p>
        New Customer ?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          <span className="link">Register</span>
        </Link>
      </p>

      {/* Comment */}
      <div className="text-red-700">
        For demo purpose, use either user's info below to log in{' '}
        <span className="uppercase">the app</span> and{' '}
        <span className="uppercase">paypal sandbox </span>(for payment later):
        <div className="my-3">
          <p>user1: jane1234@example.com</p>
          <p>password for user1: 0h/pLg-l</p>
        </div>
        <div>
          <p>user2: sb-prcet8038993@personal.example.com</p>
          <p>password for user2: (?G-RoM2 </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
