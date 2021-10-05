import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/CheckOutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  const keep2decimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Calculate Prices
  cart.itemsPrice = keep2decimals(
    cart.cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
  );

  cart.shippingPrice = cart.itemsPrice > 45 ? 0 : 17;
  cart.taxPrice = keep2decimals(0.075 * cart.itemsPrice);
  cart.totalPrice = keep2decimals(
    Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice),
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    if (cart.cartItems.length) {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          itemsPrice: cart.itemsPrice,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }),
      );
    }
  };

  return (
    <div className="max-w-7xl m-auto mt-10 space-y-7 tracking-widest p-5">
      <div className="flex justify-center">
        <CheckOutSteps step1 step2 step3 step4 />
      </div>
      <div className="w-full m-auto ">
        <div className="md:flex md:justify-between md:space-x-10">
          {/* Shipping Info */}
          <div className="flex-grow flex flex-col mb-8 md:w-1/2">
            <div className="border-b">
              <h2 className="h2 py-5">Shipping</h2>
              <p className="py-5">
                Address: {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="border-b">
              <h2 className="h2 py-5">Payment Method</h2>
              <p className="py-5">Method: {cart.paymentMethod}</p>
            </div>
            <div className="border-b">
              <h2 className="h2 py-5">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <div className="primary_msg">Your cart is Empty</div>
              ) : (
                cart.cartItems.map((item, idx) => (
                  <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-2"
                    key={idx}
                  >
                    <div className="flex justify-between items-center sm:w-1/2">
                      <div className="p-5 bg-white flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          height={80}
                          width={80}
                        />
                      </div>
                      <Link to={`/products/${item._id}`}>
                        <p className="link">{item.title}</p>
                      </Link>
                    </div>
                    <p className="pt-2">
                      {item.qty} x ${item.price} = $
                      {keep2decimals(item.qty * item.price)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border flex flex-col h-96">
            <h2 className="h2 p-5 border-b">Order Summary</h2>
            <div className="order_summary_item">
              <p className="">Items</p>
              <p>${cart.itemsPrice}</p>
            </div>
            <div className="order_summary_item">
              <p className="">Shipping</p>
              <p>${cart.cartItems.length ? cart.shippingPrice : 0}</p>
            </div>
            <div className="order_summary_item">
              <p className="">Tax</p>
              <p>${cart.taxPrice}</p>
            </div>
            <div className="order_summary_item">
              <p className="">Total</p>
              <p>${cart.totalPrice}</p>
            </div>

            <button
              className={
                cart.cartItems.length
                  ? 'bg-black text-white px-9 py-3 uppercase tracking-widest align-center hover:bg-gray-800'
                  : 'disabled'
              }
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {error && <p className="error_msg">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
