import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import FeaturedItems from '../components/FeaturedItems';
import NewArrivals from '../components/NewArrivals';
import Loader from '../components/Loader';

const Home = ({}) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="bg-gray-100">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error_msg">{error}</div>
      ) : (
        <>
          <NewArrivals products={products} />
          <FeaturedItems products={products} />
        </>
      )}
    </div>
  );
};

export default Home;
