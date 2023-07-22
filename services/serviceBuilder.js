export default class ModelService {
  constructor(model) {
    this.Model = model;
  }

  async getDocumentById(id) {
    const documentFound = await this.Model.findById(id);
    if (!documentFound) throw new Error('Resource not found');
    return documentFound;
  }

  async createDocument(data) {
    const newDocument = new this.Model(data);
    await newDocument.save();
    return newDocument;
  }

  async getListDocument(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const documentsFound = await this.Model.find({ active: true }).skip(skip).limit(limit);
    return documentsFound;
  }

  async updateDocumentById(id, data) {
    const documentToUpdate = await this.Model.findById(id);
    if (!documentToUpdate) throw new Error('Document not found');
    const updateDocument = { ...documentToUpdate.toObject(), ...data };
    await documentToUpdate.updateOne(updateDocument);
    return documentToUpdate;
  }
}
