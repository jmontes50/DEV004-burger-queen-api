const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const {
  getCategory, getCategories, createCategory, updateCategory, deleteCategory,
} = require('../controller/categories');

module.exports = (app, nextMain) => {
  app.get('/categories', requireAuth, getCategories);

  app.get('/categories/:categoriesId', requireAuth, getCategory);

  app.post('/categories', requireAdmin, createCategory);

  app.put('/categories/:categoriesId', requireAdmin, updateCategory);

  app.delete('/categories/:categoriesId', requireAdmin, deleteCategory);

  nextMain();
};
