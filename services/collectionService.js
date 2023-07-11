const Category = require('../models/categories');
const Order = require('../models/orders');
const Product = require('../models/products');
const User = require('../models/users');

const models = {
  order: Order,
  category: Category,
  product: Product,
  user: User,
};

const getModelById = async (model, id) => {
  const modelFinded = await models[model].findById(id);
  if (!modelFinded) throw new Error('Model not found');
  return modelFinded;
};

const createModel = async (model, data) => {
  const newModel = new models[model](data);
  await newModel.save();
  return newModel;
};

const getListModel = async (model, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const modelsFinded = await models[model].find({ active: true }).skip(skip).limit(limit);
  return modelsFinded;
};

const updateModelById = async (model, id, data) => {
  const modelToUpdate = await models[model].findById(id);
  if (!modelToUpdate) throw new Error('Model not found');
  const updatedModel = { ...modelToUpdate.toObject(), ...data };
  await modelToUpdate.updateOne(updatedModel);
  return updatedModel;
};

export {
  getModelById, createModel, getListModel, updateModelById,
};
