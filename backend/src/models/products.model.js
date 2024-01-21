const connection = require('./connection');

const getAllProducts = async () => {
    const [allProducts] = await connection.execute('select * from products');
    return allProducts;
};

const getProductsById = async (id) => {
    const [foundProduct] = await connection.execute('select * from products where id = ?', [id]);
    return foundProduct;
};

const addProduct = (product) => connection.execute(`insert into products 
(name) value (?) `, [product]);

const updateProduct = (id, name) => connection.execute(`update products set name = ? 
where id = ?`, [name, id]);

const deleteProduct = (id) => connection.execute('delete from products where id = ?', [id]);

module.exports = {
    getAllProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct,
};