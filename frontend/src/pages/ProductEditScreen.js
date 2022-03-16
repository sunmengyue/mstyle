import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET
} from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountinStock] = useState(0);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: updateProductLoading,
    error: updateProductError,
    success: updateProductSuccess
  } = productUpdate;

  useEffect(() => {
    if (updateProductSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/productList");
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setTitle(product.title);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setCountinStock(product.countInStock);
      }
    }
  }, [updateProductSuccess, dispatch, product, history, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        title,
        image,
        category,
        description,
        price,
        countInStock
      })
    );
  };

  return (
    <div className="form__container">
      <Link to="/admin/productList"> ← Go Back</Link>
      <h1 className="h1">Edit Product</h1>
      {updateProductLoading && <Loader />}
      {updateProductError && (
        <div className="error_msg">{updateProductError}</div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error_msg">{error}</div>
      ) : (
        <form onSubmit={submitHandler} className="form">
          {/* title */}
          <div className="form__field">
            <label htmlFor="title" className="form_label">
              Name
            </label>
            <input
              className="input pb-3"
              type="text"
              id="title"
              placeholder="name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          {/* image */}
          <div className="form__field">
            <label htmlFor="image" className="form_label">
              Image
            </label>
            <input
              className="input"
              type="text"
              id="image"
              placeholder="image url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>

          {/* category */}
          <div className="form__field">
            <label htmlFor="category" className="form_label">
              Category
            </label>
            <input
              className="input"
              type="text"
              id="category"
              placeholder="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>

          {/* price */}
          <div className="form__field">
            <label htmlFor="price" className="form_label">
              Price
            </label>
            <input
              className="input"
              type="number"
              id="price"
              placeholder="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          {/* description */}
          <div className="form__field">
            <label htmlFor="description" className="form_label">
              Description
            </label>
            <input
              className="input"
              type="text"
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          {/* count in stock */}
          <div className="form__field">
            <label htmlFor="count" className="form_label">
              Count in Stock
            </label>
            <input
              className="input"
              type="number"
              id="count"
              placeholder="count in stock"
              value={countInStock}
              onChange={(e) => {
                setCountinStock(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className=" bg-black text-white uppercase tracking-widest py-3 px-9"
            onClick={submitHandler}
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
