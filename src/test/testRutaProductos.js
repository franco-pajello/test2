const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
let id = '';
const generatePost = () => {
  return { _id: '1', producto: 'Naranja', precio: 300, img_url: 'no hay ', stock: 300, categoria: 'fruta' };
};
const generatePut = () => {
  return { producto: 'Banana', precio: 300, img_url: 'no hay ', stock: 300, categoria: 'fruta' };
};

describe('test get all endpoint', async () => {
  describe('GET ALL', () => {
    it('deberia responder con status 200 y ser array', async () => {
      const res = await request.get('/');
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
      id = res.body._id;
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
      const res = await request.put(`/${id}`).send(put);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
    });
  });

  ///DELETED

  describe('delete ONE', () => {
    it('deberia borrar un producto ', async () => {
      const res = await request.delete(`/${id}`);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
    });
  });
});
