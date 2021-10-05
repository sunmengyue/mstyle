import React from 'react';
import { useLocation } from 'react-router-dom';
import Product from './Product';
import Hero from './Hero';

const NewArrivals = ({ products }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && (
        <Hero imgSrc="./images/newArrivals.jpg" title="See New Arrivals" />
      )}
      <div className="max-w-screen-2xl m-auto grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(5, 13).map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
