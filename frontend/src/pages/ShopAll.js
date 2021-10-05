import React, { useState, useEffect } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import Filters from '../components/Filters';
import LargeFilters from '../components/LargeFilters';

const ShopAll = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [sort, setSort] = useState('');
  const [activated, setActivated] = useState(false);

  const toggleFilters = () => {
    if (activated) {
      return setActivated(false);
    }
    setActivated(true);
  };

  useEffect(() => {
    dispatch(listProducts(keyword, sort));
  }, [dispatch, keyword, sort]);

  const handleSortChange = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  // const [myFilters, setMyFilters] = useState({
  //   price: [],
  //   category: [],
  // });
  // const handleFilterCategories = (filters, type) => {
  //   console.log(filters);
  //   const newFilters = { ...myFilters };
  //   newFilters[type] = filters;

  //   if (type === 'price') {
  //   } else {
  //     setMyFilters(newFilters);
  //   }
  // };

  return (
    <div className="max-w-7xl m-auto p-7">
      <h2 className="h2 text-brown text-center">All Products</h2>
      <div className="flex justify-between mt-8">
        {/* <button
          className="py-2 px-6 border border-black mb-3 md:hidden"
          onClick={toggleFilters}
        >
          <AdjustmentsIcon className="h-6" />
        </button> */}

        <div className="hidden md:block md:flex-grow"></div>
        <div className="flex items-center">
          <p className="uppercase font-semibold tracking-widest mr-2">sort:</p>

          <select
            name="sort"
            id="sort"
            value={sort}
            onChange={(e) => handleSortChange(e)}
            className="tracking-wide border border-black py-2 px-3 focus:outline-none cursor-pointer"
          >
            <option value="-price"> Price, high to low</option>
            <option value="price">Price, low to high</option>
            <option value="title">Alphabetically, A - Z</option>
            <option value="-title">Alphabetically, Z - A</option>
            <option value="-rating">Rating, high to low</option>
            <option value="rating">Rating, low to high</option>
          </select>
        </div>
      </div>

      {/* Filters on small screen*/}
      {/* <div className={activated ? 'content show' : 'content'}>
        <Filters />
      </div> */}

      {/* Products */}
      <div className="flex justify-center items-start">
        {/* Filters on medium to large screen */}
        {/* <div className="hidden md:block mt-8">
          <LargeFilters
            handleFilterCategories={(filters) => {
              handleFilterCategories(filters);
            }}
          />
        </div> */}

        <div className="max-w-screen-2xl m-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="error_msg">{error}</div>
          ) : (
            products.map((product) => (
              <Product product={product} key={uuidv4()} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
