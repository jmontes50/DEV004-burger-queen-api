const {getOrderById, getListOrders, createNewOrder, updateOrderById, deleteOrderById} = require('../services/orders');

module.exports = {
    createOrder: async (req, res) => {
        try {
            const {userId, client, products} = req.body;
            if(!userId || products?.length === 0) {
                res.status(400).json({message: 'Bad Request, you must provide userId and products'});
                return;
            }
            const newOrder = await createNewOrder({userId, client, products});
            res.status(201).json(newOrder);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    },
    getOrder: async (req, res) => {
        try {
            const {orderId} = req.params;
            const order = await getOrderById(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },
    getOrders: async (req, res) => {
        try {
            const {page, limit} = req.params;
            const orders = await getListOrders(page, limit);
            res.status(200).json(orders);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },
    updateOrder: async (req, res) => {
        try {
            const {orderId} = req.params;
            const {userId, client, products, status} = req.body;
            const validStatus = ['pending', 'process', 'finished'];
            if(!userId && !products && !orderId && !status) {
                res.status(400).json({message: 'Bad Request, you must provide at least one field to update'});
                return;
            }
            if(validStatus.includes(status)){
                res.status(400).json({message: 'Bad Request, status must be one of the following: pending, process, finished'});
                return;
            }
            const order = await updateOrderById(orderId, {userId, client, products, status});
            res.status(200).json(order);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const {orderId} = req.params;
            const order = await deleteOrderById(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }
};