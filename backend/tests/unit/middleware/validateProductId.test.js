const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const validateProductId = require('../../../src/middlewares/validateProductId');
const { productsModel } = require('../../../src/models');

// Arrange
// Act
// Assert

chai.use(sinonChai);
const { expect } = chai;
const message = 'Product not found';

describe('Middleware de validar product id', function () {
    describe('Validate product id', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Valid id', async function () {
            sinon.stub(productsModel, 'getProductsById').resolves([[
                {
                    saleId: 1,
                    date: '2021-09-09T04:54:29.000Z',
                    productId: 1,
                    quantity: 2,
                },
                {
                    saleId: 1,
                    date: '2021-09-09T04:54:54.000Z',
                    productId: 2,
                    quantity: 2,
                },
            ]]);
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductId(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(true);
        });

        it('invalid params', async function () {
            sinon.stub(productsModel, 'getProductsById').resolves([[
                {
                    saleId: 1,
                    date: '2021-09-09T04:54:29.000Z',
                    productId: 1,
                    quantity: 2,
                },
                {
                    saleId: 1,
                    date: '2021-09-09T04:54:54.000Z',
                    productId: 2,
                    quantity: 2,
                },
            ]]);
            const req = { params: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductId(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message });
        });

        it('empty array', async function () {
            sinon.stub(productsModel, 'getProductsById').resolves([]);
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductId(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message });
        });
    });
});