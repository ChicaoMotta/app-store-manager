const { productsModel } = require('../models');

const validateProductId = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const [idExists] = await productsModel.getProductsById(id);

    if (!idExists) {
        return res.status(404).json({ message: 'Product not found' });
    }

    next();
};

module.exports = validateProductId;