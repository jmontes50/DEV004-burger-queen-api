const Product = require("../models/Product");

const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw error;
  }
}

const createNewProduct = async ({ name, description, price, category, active }) => {
    try {
        const newProduct = new Product({
        name,
        description,
        price,
        category,
        active
        });
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw error;
    }
}

const getListProducts = async (page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;
        const products = await Product.find({ active: true }).skip(skip).limit(limit);
        return products;
    } catch (error) {
        throw error;
    }
}

const updateProductById = async (id, { name, description, price, category, active }) => {
    try {
        const product = await Product.findById(id);
        if(!product) throw new Error('Producto no encontrado');
        if(name) product.name = name;
        if(description) product.description = description;
        if(price) product.price = price;
        if(category) product.category = category;
        if(active) product.active = active;
        await product.save();
        return product;
    } catch (error) {
        throw error;
    }
}

const deleteProductById = async (id) => {
    try{
        const product = Product.findById(id);
        if(!product) throw new Error('Product no encontrado');
        product.active = false;
        product.save();
    }catch(error){
        throw error;
    }
}

module.exports = {
    getProductById,
    createNewProduct,
    getListProducts,
    updateProductById,
    deleteProductById
}