const { productsModel } = require('../models');

const getAllProducts = async () => {
    const allProducts = await productsModel.getAllProducts();

    if (!allProducts || allProducts.length < 1) {
        return {
            status: 404, message: 'Product not found',
        };
    }

    return {
        status: 200, data: allProducts,
    };
};

const getOneProduct = async (id) => {
    const [productFound] = await productsModel.getProductsById(id);

    if (!productFound) {
        return {
            status: 404,
            message: 'Product not found',
        };
    }

    return { status: 200, data: productFound };
};

const postAProduct = async (name) => {
    const [{ insertId }] = await productsModel.addProduct(name);
    if (!insertId) return { status: 500, data: { id: null }, message: 'Server error' };

    return { status: 201, data: { id: insertId, name } };
};

const updateProduct = async (id, name) => {
    const sucess = await productsModel.updateProduct(id, name);
    if (sucess[0].affectedRows < 1 || sucess.length < 1) return { status: 500, data: { id: null } };

    return { status: 200, data: { id, name } };
};

const deleteProduct = async (id) => {
    const sucess = await productsModel.deleteProduct(id);

    if (sucess[0].affectedRows < 1 || sucess.length < 1) {
        return { status: 500, message: 'Server error' };
    }

    return { status: 204 };
};

module.exports = {
    getAllProducts,
    getOneProduct,
    postAProduct,
    updateProduct,
    deleteProduct,
};