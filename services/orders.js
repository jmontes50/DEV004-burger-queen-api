const Order = require('../models/orders');

const getOrderById = async (id) => {
    try {
        return await Order.findById(id).populate('products.productId').exec();
    }catch(error){
        throw error;
    }
};

const createNewOrder = async ({userId, client, products}) => {
    try {
        const newOrder = new Order({
            userId,
            client,
            products
        });
        await newOrder.save();
        return newOrder;
    }catch(error){
        throw error;
    }
};

const getListOrders = async (page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;
        const orders = await Order.find().skip(skip).limit(limit).populate('products.productId').exec();
        return orders;
    }catch(error){
        throw error;
    }
};

const updateOrderById = async (id, {userId, client, products, status}) => {
    try {
        const order = await Order.findById(id);
        if(!order) throw new Error('Orden no encontrada');
        if(userId) order.userId = userId;
        if(client) order.client = client;
        if(products) order.products = products;
        if(status) order.status = status;
        await order.save();
        return order;
    }catch(error){
        throw error;
    }
};

const deleteOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        if(!order) throw new Error('Orden no encontrada');
        //borrar order usando mongoose
        order.deleteOne(id);
        return order;
    }catch(error){
        throw error;
    }
};

module.exports = {
    getOrderById,
    createNewOrder,
    getListOrders,
    updateOrderById,
    deleteOrderById
};