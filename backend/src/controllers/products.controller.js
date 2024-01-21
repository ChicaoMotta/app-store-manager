// const { productsModel } = require('../models');
const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
    const { status, data, message } = await productService.getAllProducts();

    if (message) {
        return res.status(status).json({ message });
    }

    return res.status(status).json(data);
};

const getOneProduct = async (req, res) => {
    const { id } = req.params;

    const { status, data, message } = await productService.getOneProduct(id);

    if (message) {
        return res.status(status).json({ message });
    }

    return res.status(status).json(data);
};

const postAProduct = async (req, res) => {
    const { name } = req.body;

    const { status, data: { id } = {}, message } = await productService.postAProduct(name);

    if (message) return res.status(status).json({ message });

    res.status(status).json({ id, name });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const { status, message } = await productService.updateProduct(id, name);

    if (message) return res.status(status).json({ message });

    res.status(status).json({ id: Number(id), name });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await productService.deleteProduct(id);

    if (message) return res.status(status).json({ message });

    res.status(status).end();
};

module.exports = {
    getAllProducts,
    getOneProduct,
    postAProduct,
    updateProduct,
    deleteProduct,
};