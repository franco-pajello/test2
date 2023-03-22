const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generatePost = () => {
  return { producto: 'naranja', precio: 300, img_url: 'no hay ', stock: 300, categoria: 'fruta' };
};
const generatePut = () => {
  return { producto: 'banana', precio: 300, img_url: 'no hay ', stock: 300, categoria: 'fruta' };
};

describe('test get all endpoint', () => {
  describe('GET ALL', () => {
    it('deberia responder con status 200 y ser array', async () => {
      const res = await request.get('/');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
    });
  });

  ///POST
  describe('POST ONE', () => {
    it('deberia incorporar un posteo', async () => {
      const post = generatePost();
      const res = await request.post('/uploadfile').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('producto', 'precio', 'img_url', 'stock', 'categoria', '_id', 'cantidad', '__v');
      expect(post.producto).to.eql(res.body.producto);
      expect(post.precio).to.eql(res.body.precio);
      expect(post.img_url).to.eql(res.body.img_url);
      expect(post.stock).to.eql(res.body.stock);
      expect(post.categoria).to.eql(res.body.categoria);
    });
  });

  ///PUT
  describe('put ONE', () => {
    it('deberia cambiar un producto ', async () => {
      const put = generatePut();

      const res = await request.put('/641b835beaa0730e4d25a892').send(put);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
    });
  });

  ///DELETED
  describe('delete ONE', () => {
    it('deberia cambiar un producto ', async () => {
      const res = await request.delete('/641b835beaa0730e4d25a892');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
    });
  });
});
