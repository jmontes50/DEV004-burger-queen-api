const { getCategoryById, createNewCategory, getListCategories, updateCategoryById, deleteCategoryById } = require('../services/categories');

module.exports = {
    createCategory: async (req, res, next) => {
        console.log(req.body)
        try {
            await createNewCategory(req.body);
            res.status(201).json({ message: 'Categoría creada con éxito' });
        } catch (error) {
            console.log({ error });
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await getCategoryById(id);
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
            const { id } = req.params;
            const category = await updateCategoryById(id, req.body);
            res.status(201).json(category);
        } catch (error) {
            throw error;
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await deleteCategoryById(id);
            res.status(201).json(category);
        } catch (error) {
            throw error;
        }
    }
}