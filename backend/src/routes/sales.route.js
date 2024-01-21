const router = require('express').Router();
const validateSaleInsert = require('../middlewares/validateSaleInsert');
// const connection = require('../models/connection');
const { salesModel } = require('../models');

router.get('/', async (_request, response) => {
    const allSales = await salesModel.getAllSales();
    response.status(200).json(allSales);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;

    const [saleFound] = await salesModel.getSalesById(id);
    if (saleFound.length < 1) {
        return response.status(404).json({ message: 'Sale not found' });
    }
    response.status(200).json(saleFound);
});

router.post('/', validateSaleInsert, async (request, response) => {
    const saleArray = request.body;
    try {
        const insertId = await salesModel.addSale(saleArray);
        response.status(201).json({
            id: insertId,
            itemsSold: saleArray,
        });
    } catch (e) {
        response.status(500).json(e);
    }
});

module.exports = router;