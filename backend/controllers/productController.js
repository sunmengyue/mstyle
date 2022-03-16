import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

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
              $options: "i"
            }
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: "i"
            }
          }
        ]
      }
    : {};

  const features = new APIFeatures(
    Product.find({ $or: [{ ...keyword }, { category: req.query.category }] }),
    req.query
  )
    .filtering()
    .sorting();
  const products = await features.query;

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
    throw new Error("Product not found");
  }
});

// @desc DELETE a single product
// @route DELETE/api/products/:id
// @acess Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a product
// @route POST /api/products
// @acess Private
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    title: "Example name",
    image: "/images/sample.jpg",
    category: "Example category",
    description: "This is a new product",
    price: 0,
    countInStock: 0
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product by Id
// @route PUT /api/products/:id
// @acess Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { title, image, category, description, price, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.title = title;
    product.image = image;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } else {
    res.status(404);
    throw new Error("Product does not exist");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct
};
