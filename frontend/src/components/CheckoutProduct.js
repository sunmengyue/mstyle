import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';

const CheckoutProduct = ({ product, remove, cartItems }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col space-y-3 items-start sm:flex-row sm:items-start sm:space-x-2 sm:justify-around border-b pb-3 last:border-b-0">
      <img
        src={product.image}
        alt="product"
        height={100}
        width={100}
        className="object-contain"
      />
      <div className="w-64 md:w-72 ">
        <p className="mb-1">{product.title}</p>
        <p>${product.price}</p>
        <label htmlFor="quantity" className="uppercase font-light  ">
          Quantity
        </label>
        <select
          name="qty"
          id="quantity"
          value={product.qty}
          onChange={(e) =>
            dispatch(addToCart(product.product_id, Number(e.target.value)))
          }
          className="border border-gray-600 py-1 px-3 focus:outline-none ml-4 lg:py-2 lg:px-4"
        >
          {[...Array(product.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      {cartItems.length !== 0 && (
        <button onClick={remove}>
          <TrashIcon className="h-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default CheckoutProduct;
