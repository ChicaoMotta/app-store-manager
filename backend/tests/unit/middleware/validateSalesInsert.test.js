const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const [validateProduct, validateQuantity] = require('../../../src/middlewares/validateSaleInsert');

// Arrange
// Act
// Assert

chai.use(sinonChai);
const { expect } = chai;

describe('Middleware de validar salesInsert', function () {
    describe('Validate quantity', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Valid quantity', async function () {
            const req = {
                body:
                    [
                        {
                            date: '2021-09-09T04:54:29.000Z',
                            productId: 1,
                            quantity: 2,
                        },
                        {
                            date: '2021-09-09T04:54:54.000Z',
                            productId: 2,
                            quantity: 2,
                        },
                    ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateQuantity(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(true);
        });

        it('invalid body.name', async function () {
            const req = {
                body: [{
                    fail: 5,
                },
                ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateQuantity(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
        });

        it('invalid quantity', async function () {
            const req = {
                body: [{
                    quantity: 0,
                },
                ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateQuantity(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(422);
            expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
        });
    });
    describe('Validate Product', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Valid Product', async function () {
            const req = {
                body:
                    [
                        {
                            date: '2021-09-09T04:54:29.000Z',
                            productId: 1,
                            Product: 2,
                        },
                        {
                            date: '2021-09-09T04:54:54.000Z',
                            productId: 2,
                            Product: 2,
                        },
                    ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProduct(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(true);
        });

        it('invalid body.name', async function () {
            const req = {
                body: [{
                    fail: 3,
                },
                ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProduct(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
        });

        it('invalid Product', async function () {
            const req = {
                body: [{
                    productId: 0,
                },
                ],
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProduct(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
        });
    });
}); 