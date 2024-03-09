const supertest = require('supertest');
const chai = require('chai');
const app = require('../server'); 

const expect = chai.expect;
const request = supertest(app);

describe('GET /api/generate', function() {

  this.timeout(5000);

  /* Dia */

  it('Deve retornar uma imagem de bom dia com o tipo png', async function() {
    const res = await request.get('/api/generate?periodo=manha&tipo=png');
    expect(res.headers['content-type']).to.match(/image\/png/);
    expect(res.status).to.equal(200);
  });

  it('Deve retornar uma imagem de bom dia com o tipo jpg', async function() {
    const res = await request.get('/api/generate?periodo=manha&tipo=jpg');
    expect(res.headers['content-type']).to.match(/image\/jpg/);
    expect(res.status).to.equal(200);
  });

  /* Tarde */

  it('Deve retornar uma imagem de boa tarde com o tipo png', async function() {
    const res = await request.get('/api/generate?periodo=tarde&tipo=png');
    expect(res.headers['content-type']).to.match(/image\/png/);
    expect(res.status).to.equal(200);
  });

  it('Deve retornar uma imagem de boa tarde com o tipo jpg', async function() {
    const res = await request.get('/api/generate?periodo=tarde&tipo=jpg');
    expect(res.headers['content-type']).to.match(/image\/jpg/);
    expect(res.status).to.equal(200);
  });

  /* Noite */

  it('Deve retornar uma imagem de boa noite com o tipo png', async function() {
    const res = await request.get('/api/generate?periodo=noite&tipo=png');
    expect(res.headers['content-type']).to.match(/image\/png/);
    expect(res.status).to.equal(200);
  });

  it('Deve retornar uma imagem de boa noite com o tipo jpg', async function() {
    const res = await request.get('/api/generate?periodo=noite&tipo=jpg');
    expect(res.headers['content-type']).to.match(/image\/jpg/);
    expect(res.status).to.equal(200);
  });

});
