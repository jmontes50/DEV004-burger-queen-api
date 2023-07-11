const Category = require('../models/categories');

const getCategoryById = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw error;
  }
};

const createNewCategory = async ({ name, active }) => {
  try {
    const newCategory = new Category({
      name,
      active,
    });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const getListCategories = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;
    const categories = await Category.find({ active: true }).skip(skip).limit(limit);
    return categories;
  } catch (error) {
    throw error;
  }
};

const updateCategoryById = async (id, { name, active }) => {
  try {
    const category = await Category.findById(id);
    if (!category) throw new Error('Categoría no encontrada');
    if (name) category.name = name;
    if (active) category.active = active;
    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

const deleteCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) throw new Error('Categoría no encontrada');
    category.active = false;
    category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategoryById,
  createNewCategory,
  getListCategories,
  updateCategoryById,
  deleteCategoryById,
};
