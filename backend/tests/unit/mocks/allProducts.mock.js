const allProductsMock = [
    {
        id: 1,
        name: 'Martelo de Thor',
    },
    {
        id: 2,
        name: 'Traje de encolhimento',
    },
    {
        id: 3,
        name: 'Escudo do Capitão América',
    },
];

const productNotFound = {
    message: 'Product not found',
};

const allProductsError = {
    status: 404, message: 'Product not found',
};

const allProductsQuery = {
    status: 200,
    data: allProductsMock,
};

const oneProductMock = {
    id: 1,
    name: 'Martelo de Thor',
};

const oneProductsQuery = {
    status: 200,
    data: oneProductMock,
};

const postProductMock = {
    insertId: 4,
};

const postAProductQuery = {
    status: 201,
    data: {
        id: 4,
        name: 'Nome Teste',
    },
};

const putProductMock = {
    id: 3,
    name: 'Nome Teste',
};

module.exports = {
    productNotFound,
    allProductsMock,
    allProductsQuery,
    allProductsError,
    oneProductMock,
    oneProductsQuery,
    postProductMock,
    postAProductQuery,
    putProductMock,
};