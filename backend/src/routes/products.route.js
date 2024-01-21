const router = require('express').Router();
const { productsController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateProductInsert = require('../middlewares/validateProductInsert');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getOneProduct);

router.post('/', validateProductInsert, productsController.postAProduct);

router.put('/:id', validateProductInsert, validateProductId, productsController.updateProduct);

router.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = router;