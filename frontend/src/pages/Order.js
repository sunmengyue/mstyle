import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const Order = ({ match, history }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const keep2decimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (!loading) {
    order.itemsPrice = keep2decimals(
      order.orderItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="error_msg">{error}</div>
  ) : (
    <>
      <div className="max-w-7xl m-auto mt-10 space-y-7 tracking-widest p-5">
        <h1 className="h2">Order: {orderId}</h1>
        <div className="flex justify-center"></div>
        <div className="w-full m-auto ">
          <div className="md:flex md:justify-between md:space-x-10">
            {/* Shipping Info */}
            <div className="flex-grow flex flex-col mb-8 md:w-1/2">
              <div className="border-b">
                <h2 className="h2 py-5">Shipping</h2>
                <p>Name: {userInfo.name}</p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${order.user.email}`}
                    className="hover:underline"
                  >
                    {order.user.email}
                  </a>
                </p>
                <p className="py-5">
                  Address: {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <p className="primary_msg">
                    Delivered at: {order.deliveredAt}
                  </p>
                ) : (
                  <p>Not dilivered</p>
                )}
              </div>
              <div className="border-b">
                <h2 className="h2 py-5">Payment Method</h2>
                <p className="py-5">Method: {order.paymentMethod}</p>
                {order.isPaid ? (
                  <p className="primary_msg flex items-center">
                    Paid on: {order.paidAt}
                  </p>
                ) : (
                  <p>Not paid yet</p>
                )}
              </div>
              <div className="border-b">
                <h2 className="h2 py-5">Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <div className="primary_msg">Order is Empty</div>
                ) : (
                  order.orderItems.map((item, idx) => (
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
                        {(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Order Info */}
            <div className="border flex flex-col h-80">
              <h2 className="h2 p-5 border-b">Order Summary</h2>
              <div className="order_summary_item">
                <p className="">Items</p>
                <p>${order.itemsPrice}</p>
              </div>
              <div className="order_summary_item">
                <p className="">Shipping</p>
                <p>${order.shippingPrice}</p>
              </div>
              <div className="order_summary_item">
                <p className="">Tax</p>
                <p>${order.taxPrice}</p>
              </div>
              <div className="order_summary_item">
                <p className="">Total</p>
                <p>${order.totalPrice}</p>
              </div>
              {!order.isPaid && (
                <>
                  {loadingPay && <Loader />}{' '}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
