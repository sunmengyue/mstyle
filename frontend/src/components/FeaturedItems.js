import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Product from './Product';

const FeaturedItems = ({ products }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && (
        <Hero imgSrc="./images/featured.jpg" title="Build your own style" />
      )}
      <div className="max-w-screen-2xl m-auto grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Product key={product._id} product={product} />
        ))}
        {products.slice(13, 20).map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
