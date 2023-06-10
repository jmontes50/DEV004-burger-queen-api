const Product = require("../models/products");

const getProductById = async (id) => {
  try {
    return await Product.findById(id).populate('type').exec();
  } catch (error) {
    throw error;
  }
}

const createNewProduct = async ({ name, description, price, type, active }) => {
    try {
        const newProduct = new Product({
        name,
        description,
        price,
        type,
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
        const products = await Product.find({ active: true }).skip(skip).limit(limit).populate('type').exec();
        return products;
    } catch (error) {
        throw error;
    }
}

const updateProductById = async (id, { name, description, price, type, active }) => {
    try {
        const product = await Product.findById(id);
        if(!product) throw new Error('Producto no encontrado');
        if(name) product.name = name;
        if(description) product.description = description;
        if(price) product.price = price;
        if(type) product.type = type;
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