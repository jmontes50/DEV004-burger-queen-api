const { secret } = require('../config');
const User = require("../models/users");

const getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error({error})
        throw error;
    }
    
}

module.exports = {
    getUserById
}