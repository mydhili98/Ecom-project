const Products = require('../Models/products');

const createProduct = async (req, res, next) => {
  try {
    const { title, mrp, description, category } = req.body;
    const newProduct = new Products({
      title,
      mrp,
      description,
      category,
      image: `/uploads/${req.file.filename}`,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const getProductList = async (req, res, next) => {
  try {
    const products = await Products.find({}).populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Products.find({ category: categoryId }).populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Deleted', deletedProduct: product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

module.exports = {
  createProduct,
  getProductList,
  getProductsByCategory,
  getProductById,
  deleteProduct,
};