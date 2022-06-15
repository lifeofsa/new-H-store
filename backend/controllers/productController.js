import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc       Fetch all products
// @method     GET /api/products
// @access     public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.count({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc       Fetch single product
// @method     GET /api/product/:id
// @access     public

const productById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(401);
    throw new Error('unAuthorized');
  }
});

const productDeleteId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Deleted' });
  } else {
    res.json(401);
    throw new Error('Something went wrong');
  }
});

const productCreateId = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: 'sample name',
    price: 0,
    brand: 'sample brand',
    category: 'sample category',
    user: req.user._id,
    countInStock: 0,
    numReviews: 0,
    image: '/images/sample.jpg',
    description: 'sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const productUpdateId = asyncHandler(async (req, res) => {
  const { name, brand, countInStock, price, image, description, category } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.brand = brand;
    product.countInStock = countInStock;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const productCreatedReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      comment,
      rating: Number(rating),
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc       GET Carousel
// @method     GET /api/product/:id
// @access     public

const productCarousel = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(product);
});

// @desc      DELETE review by admin
// @method    Delete/api/users/:id
// @access    private/admin
const deleteReviewAdmin = async (req, res) => {
  const { rating } = req.body;
  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },

    { $pull: { reviews: { _id: req.params.rid } } },
  );
  if (product) {
    product.numReviews = product.reviews.length;
    product.numReviews--;

    // product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews;
    await product.save();
    res.json(product);
  } else {
    res.status(401).json({ message: 'unAuthorized' });
  }
};

export {
  getProducts,
  productById,
  productDeleteId,
  productCreateId,
  productUpdateId,
  productCarousel,
  productCreatedReview,
  deleteReviewAdmin,
};
