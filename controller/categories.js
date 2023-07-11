const {
  getCategoryById, createNewCategory, getListCategories, updateCategoryById, deleteCategoryById,
} = require('../services/categories');

module.exports = {
  createCategory: async (req, res, next) => {
    console.log(req.body);
    try {
      await createNewCategory(req.body);
      res.status(201).json({ message: 'Category created' });
    } catch (error) {
      res.status(500).json({ error: 'Error at create category' });
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const { categoriesId } = req.params;
      const category = await getCategoryById(categoriesId);
      res.status(200).json({ ...category });
    } catch (error) {
      throw error;
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const { page, limit } = req.params;
      const categories = await getListCategories(page, limit);
      res.status(200).json(categories);
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { categoriesId } = req.params;
      const category = await updateCategoryById(categoriesId, req.body);
      res.status(201).json(category);
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const { categoriesId } = req.params;
      const category = await deleteCategoryById(categoriesId);
      res.status(201).json(category);
    } catch (error) {
      throw error;
    }
  },
};
