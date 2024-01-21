const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
    const [allSales] = await connection.execute(`select sales_products.sale_id,
    sales.date, 
    sales_products.product_id,
    sales_products.quantity 
    from sales 
    inner join sales_products
    on sales.id = sales_products.sale_id`);

    return camelize(allSales);
};

const getSalesById = async (id) => {
    const foundSales = await connection.execute(`select
    sales.date, 
    sales_products.product_id,
    sales_products.quantity 
    from sales 
    inner join sales_products
    on sales.id = sales_products.sale_id where sales.id = ?`, [id]);
    return camelize(foundSales);
};

const addSale = async (saleArray) => {
    const [{ insertId }] = await connection.execute(`insert into sales 
                              (date) value (CURRENT_TIMESTAMP) `);

    saleArray.map(async (sale) => {
        await connection.execute(`insert into sales_products 
        (sale_id, product_id, quantity) 
        value (?,?,?)`, [insertId, sale.productId, sale.quantity]);
    });
    return insertId;
};

module.exports = {
    getAllSales,
    getSalesById,
    addSale,
};