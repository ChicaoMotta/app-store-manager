const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const validateProductInsert = require('../../../src/middlewares/validateProductInsert');
const { productsModel } = require('../../../src/models');

// Arrange
// Act
// Assert

chai.use(sinonChai);
const { expect } = chai;

describe('Middleware de validar product id', function () {
    describe('Validate product id', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('Valid id', async function () {
            const req = { body: { name: 'Nome Teste' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductInsert(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(true);
        });

        it('invalid params', async function () {
            const req = { body: { fail: 'Nome Teste' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductInsert(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
        });

        it('empty array', async function () {
            sinon.stub(productsModel, 'getProductsById').resolves([[
            ]]);
            const req = { body: { name: 'Nome' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.spy();

            await validateProductInsert(req, res, next);

            // eslint-disable-next-line no-unused-expressions
            expect(next.called).to.be.equal(false);
            expect(res.status).to.have.been.calledWith(422);
            expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
        });
    });
});