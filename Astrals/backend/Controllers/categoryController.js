const Categories = require('../Models/categories');

const getCategoryList = async (req, res, next) => {
  try {
    const categories = await Categories.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Categories({
      title: req.body.title,
      image: `/uploads/${req.file.filename}`,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Categories.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'Deleted', deletedCategory: category });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

module.exports = {
  getCategoryList,
  createCategory,
  deleteCategory,
};