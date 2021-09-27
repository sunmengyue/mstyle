import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET/api/products
// @acess Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            title: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products);
});

// @desc Fetch a single product
// @route GET/api/products/:id
// @acess Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
