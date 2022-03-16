import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  createProduct
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const ProductAdminList = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    success: productDeleteSuccess,
    error: productDeleteError
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateLoading,
    success: productCreateSuccess,
    error: productCreateError,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (productCreateSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    productDeleteSuccess,
    productCreateSuccess,
    createdProduct
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="max-w-7xl m-auto p-5 md:flex md:justify-between">
      <div className="flex-grow overflow-auto">
        <h1 className="uppercase tracking-widest text-3xl my-7">
          Product List
        </h1>
        <button
          className=" bg-black text-white uppercase tracking-widest py-3 px-9 mb-10"
          onClick={createHandler}
        >
          Create Product
        </button>
        {productDeleteLoading && <Loader />}
        {productDeleteError && (
          <div className="error_msg">{productDeleteError}</div>
        )}
        {productCreateLoading && <Loader />}
        {productCreateError && (
          <div className="error_msg">{productCreateError}</div>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error_msg">{error}</div>
        ) : (
          <table className="border w-full">
            <thead>
              <tr className="border">
                <th className="th">Id</th>
                <th className="th">Name</th>
                <th className="th">Price</th>
                <th className="th">Category</th>
              </tr>
            </thead>
            <tbody className="nth-child:bg-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="td align-middle">{product._id}</td>
                  <td className="td align-middle">{product.title}</td>
                  <td className="td align-middle">${product.price}</td>
                  <td className="td align-middle">{product.category}</td>
                  <td>
                    <div className="flex p-2 items-baseline">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <PencilAltIcon className="h-5 pr-2 cursor-pointer text-gray-400 hover:text-gray-600 ease-transform transition-colors ease-out" />
                      </Link>
                      <TrashIcon
                        className="h-5 cursor-pointer text-red-300 hover:text-red-700 transform transition-colors ease-out"
                        onClick={() => deleteHandler(product._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductAdminList;
