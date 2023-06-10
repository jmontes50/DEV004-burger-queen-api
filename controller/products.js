const { getProductById, createNewProduct, getListProducts, updateProductById, deleteProductById } = require('../services/products');

module.exports = {
    createProduct: async (req, res) => {
        try {
            const { name, description, price, type, active } = req.body;
            if(!name || !price) {
                res.status(400).json({ message: 'Bad Request,you must provide name and price' });
                return;
            }
            const newProduct = await createNewProduct({ name, description, price, type, active });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await getProductById(productId);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            const { page, limit } = req.params;
            const products = await getListProducts(page, limit);
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const { name, description, price, type, active } = req.body;
            if(!name && !price && !type && !active && !productId) {
                res.status(400).json({ message: 'Bad Request, you must provide at least one field to update ' });
                return;
            }
            const product = await updateProductById(productId, { name, description, price, type, active });
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            await deleteProductById(productId);
            res.status(200).json({ message: 'Product deleted' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
}