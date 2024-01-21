const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../../../src/app');
const { allProductsMock, oneProductMock, postProductMock, putProductMock } = require('../mocks/allProducts.mock');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testando a API Store Manager Models', function () {
  describe('Usando o método GET em /products', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Retorna a lista completa de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsMock]);

      const allProducts = await productsModel.getAllProducts();

      expect(allProducts).to.be.an('array');
      expect(allProducts).to.deep.equal(allProductsMock);
    });

    it('Retorna um produto', async function () {
      sinon.stub(connection, 'execute').resolves([oneProductMock]);
      const insertID = 1;

      const productFound = await productsModel.getProductsById(insertID);

      expect(productFound).to.be.an('object');
      expect(productFound).to.deep.equal(oneProductMock);
    });
  });

  describe('Usando o método POST em /products', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Retorna o Id do produto inserido', async function () {
      sinon.stub(connection, 'execute').resolves(postProductMock);

      const productName = 'Nome Teste';
      const postProduct = await productsModel.addProduct(productName);

      expect(postProduct).to.be.an('object');
      expect(postProduct).to.have.property('insertId');
      expect(postProduct.insertId).to.equal(4);
    });
  });

  describe('Usando o método PUT em /products', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Retorna o Id do produto alterado', async function () {
      sinon.stub(connection, 'execute').resolves(putProductMock);

      const productName = 'Nome Teste';
      const productId = 3;
      const putProduct = await productsModel.updateProduct(productId, productName);

      expect(putProduct).to.be.an('object');
      expect(putProduct).to.have.property('id');
      expect(putProduct.id).to.equal(productId);
      expect(putProduct).to.have.property('name');
      expect(putProduct.name).to.equal(productName);
    });
  });

  describe('Usando o método DELETE em /products', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Retorna quantas rows foram deletadas', async function () {
      sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });
      const productId = 3;
      const deleteProduct = await productsModel.deleteProduct(productId);

      expect(deleteProduct).to.be.an('object');
      expect(deleteProduct).to.have.property('affectedRows');
      expect(deleteProduct.affectedRows).to.equal(1);
    });
  });
});