import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';

const ProductDetail = ({ history, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  const addToBagHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error_msg">{error}</div>
      ) : (
        <div className="max-w-7xl m-auto">
          <div className="flex flex-col items-center justify-center p-14 md:flex-row md:justify-between md:items-center lg:justify-around">
            <div className="p-4 m-auto w-56 h-56 flex bg-white items-center justify-center">
              <img
                src={product.image}
                alt="product"
                width={160}
                height={160}
                className="obj-contain m-auto"
              />
            </div>
            <div className="ml-5 sm:w-3/4 lg:ml-10">
              <h5 className="font-bold mt-5 tracking-widest lg:text-xl lg:mb-2 ">
                {product.title}
              </h5>
              <div className="mb-3 lg:mb-4">
                <p>${product.price}</p>
              </div>
              <Rating value={product.rating} />
              <p>{product.description}</p>
              <p className="mt-4">
                <span className="font-light">Status</span>:{' '}
                {product.countInStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="mt-3 lg:mt-5">
                <label htmlFor="quantity" className="uppercase font-light  ">
                  Quantity
                </label>
                <select
                  name="qty"
                  id="quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="border border-gray-600 py-1 px-3 focus:outline-none ml-4 lg:py-2 lg:px-4"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="uppercase border border-gray-600 py-3 px-7 mt-5 text-white bg-black lg:mt-7 hover:bg-gray-800"
                onClick={addToBagHandler}
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
