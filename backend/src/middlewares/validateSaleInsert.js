const validateQuantity = (req, res, next) => {
    const productArray = req.body;

    const hasQuantity = productArray.every((product) => Object.prototype
        .hasOwnProperty.call(product, 'quantity'));

    if (!hasQuantity) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    const hasValidQuantity = productArray.every((product) => product.quantity > 0);

    if (!hasValidQuantity) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
};

const validateProduct = (req, res, next) => {
    const productArray = req.body;

    const hasId = productArray.every((product) => Object.prototype
        .hasOwnProperty.call(product, 'productId'));

    if (!hasId) {
        return res.status(400).json({ message: '"productId" is required' });
    }

    // const hasValidId = productArray.every((product) =>
    //     productsModel.getProductsById(product.productId));

    const hasValidId = productArray.every((product) => product.productId >= 1
        && product.productId <= 3);

    if (!hasValidId) {
        return res.status(404).json({ message: 'Product not found' });
    }

    next();
};

module.exports = [validateProduct, validateQuantity];