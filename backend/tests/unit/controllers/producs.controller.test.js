const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { allProductsQuery, oneProductsQuery, allProductsMock, oneProductMock, allProductsError, productNotFound, postAProductQuery } = require('../mocks/allProducts.mock');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const name = 'Nome Teste';

const message = 'Server error';

describe('Testando a API Store Manager Controllers', function () {
    describe('Usando o método GET em /products', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Retorna a lista completa de produtos', async function () {
            sinon.stub(productService, 'getAllProducts').resolves(allProductsQuery);
            const req = {};

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.getAllProducts(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(allProductsMock);
        });

        it('Retorna mensagem de erro caso nao tenha produtos', async function () {
            sinon.stub(productService, 'getAllProducts').resolves(allProductsError);
            const req = {};

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.getAllProducts(req, res);
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith(productNotFound);
        });

        it('Retorna um produto', async function () {
            sinon.stub(productService, 'getOneProduct').resolves(oneProductsQuery);

            const req = {
                params: { id: 1 },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.getOneProduct(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(oneProductMock);
        });

        it('Retorna mensagem de erro caso nao tenha um produto', async function () {
            sinon.stub(productService, 'getOneProduct').resolves(allProductsError);
            const req = {
                params: { id: 1 },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.getOneProduct(req, res);
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith(productNotFound);
        });
    });

    describe('Usando o método POST em /products', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Retorna a id e name do produto', async function () {
            sinon.stub(productService, 'postAProduct').resolves(postAProductQuery);

            const req = {
                body: {
                    name,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.postAProduct(req, res);
            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith(postAProductQuery.data);
        });

        it('Retorna status 500 em caso de erro', async function () {
            sinon.stub(productService, 'postAProduct').resolves({ status: 500, message });

            const req = {
                body: {
                    name,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.postAProduct(req, res);
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message });
        });
    });

    describe('Usando o método PUT em /products', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Retorna status correto', async function () {
            sinon.stub(productService, 'updateProduct').resolves({ status: 200, data: { id: 1, name } });

            const req = {
                params: {
                    id: 1,
                },
                body: {
                    name,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.updateProduct(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ id: 1, name });
        });

        it('Retorna status 500 em caso de erro', async function () {
            sinon.stub(productService, 'updateProduct').resolves({ status: 500, message });

            const req = {
                params: {
                    id: 1,
                },
                body: {
                    name,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.updateProduct(req, res);
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message });
        });
    });

    describe('Usando o método DELETE em /products', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Retorna status correto', async function () {
            sinon.stub(productService, 'deleteProduct').resolves({ status: 204 });

            const req = {
                params: {
                    id: 1,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                end: sinon.stub(),
            };

            await productsController.deleteProduct(req, res);
            expect(res.status).to.have.been.calledWith(204);
        });

        it('Retorna status 500 em caso de erro', async function () {
            sinon.stub(productService, 'deleteProduct').resolves({ status: 500, message });

            const req = {
                params: {
                    id: 1,
                },
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await productsController.deleteProduct(req, res);
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.been.calledWith({ message });
        });
    });
});