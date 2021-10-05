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
    </div>
  );
};

export default Login;
