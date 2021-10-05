import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div className="form__container">
      <CheckOutSteps step1 step2 step3 />
      <h1 className="h1">Payment Method</h1>
      <div className="flex-col space-y-2">
        {/* <h5 className="form_label text-xl">Select Method</h5> */}

        {/* Paypal and credit card */}
        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="Paypal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal" className="ml-3 cursor-pointer">
            Paypal or Credit Card
          </label>
        </div>

        {/* Stripe */}
        {/* <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="stripe" className="ml-3 cursor-pointer">
            Stripe
          </label>
        </div> */}
      </div>
      <button
        className="bg-black text-white uppercase py-3 px-8 tracking-wider cursor-pointer hover:bg-gray-800 transform transition-colors ease-out"
        onClick={submitHandler}
      >
        Continue
      </button>
    </div>
  );
};

export default Payment;
