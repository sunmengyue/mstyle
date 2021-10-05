import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <div className="form__container">
      <CheckOutSteps step1 step2 />
      <h1 className="h1">Shipping</h1>

      {/* Address */}
      <div className="form__field">
        <label htmlFor="name" className="form_label">
          Address
        </label>
        <input
          className="input"
          type="text"
          id="address"
          placeholder="Enter address"
          required
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>

      {/* City */}
      <div className="form__field">
        <label htmlFor="name" className="form_label">
          City
        </label>
        <input
          className="input"
          type="text"
          id="city"
          placeholder="Enter city"
          required
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>

      {/* Postal Code */}
      <div className="form__field">
        <label htmlFor="name" className="form_label">
          Postal Code
        </label>
        <input
          className="input"
          type="text"
          id="postalCode"
          placeholder="Enter postal code"
          required
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
        />
      </div>

      {/* Country */}
      <div className="form__field">
        <label htmlFor="name" className="form_label">
          Country
        </label>
        <input
          className="input"
          type="text"
          id="Country"
          placeholder="Enter country"
          required
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
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

export default Shipping;
