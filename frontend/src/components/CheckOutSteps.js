import React from 'react';
import { Link } from 'react-router-dom';

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul className="flex flex-col space-y-2 max-w-xl sm:flex-row sm:space-y-0 sm:items-center sm:justify-between sm:space-x-10">
      <li>
        {step1 ? (
          <Link to="/login">
            <p className="link">Sign in</p>
          </Link>
        ) : (
          <p className="disabled">Sign in</p>
        )}
      </li>

      <li>
        {step2 ? (
          <Link to="/shipping">
            <p className="link">Shipping</p>
          </Link>
        ) : (
          <p className="disabled">Shipping</p>
        )}
      </li>
      <li>
        {step3 ? (
          <Link to="/payment">
            <p className="link">Payment</p>
          </Link>
        ) : (
          <p className="disabled">Payment</p>
        )}
      </li>
      <li>
        {step4 ? (
          <Link to="/placeorder">
            <p className="link">Place Order</p>
          </Link>
        ) : (
          <p className="disabled">Place Order</p>
        )}
      </li>
    </ul>
  );
};

export default CheckOutSteps;
