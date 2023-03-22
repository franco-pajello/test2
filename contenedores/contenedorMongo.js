const { model, connect } = require('mongoose');
const { logger } = require('../logs/logWinston.js');

const { Singleton } = require('../connectToMongo.js');

class Contenedor {
  constructor(schema, modelo, nuevoElemento) {
    this.modelo = modelo;
    this.nuevoElemento = nuevoElemento;
    this.schema = model(schema, modelo);
  }

  async getAll() {
    const connectToMongo = await Singleton.getInstance();
    try {
      const arrayDeElementos = await this.schema.find({});
      return arrayDeElementos;
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getById(id) {
    try {
      console.log('getById ', id);
      const TraerTodo = await this.schema.findById({ _id: `${id}` });
      console.log('TraerTodo', TraerTodo);
      return TraerTodo;
    } catch (err) {
      return undefined;
    }
  }
  async getByOne(id) {
    try {
      const TraerUno = await this.schema.findOne(id);
      return TraerUno;
    } catch (err) {
      return { error: true, msg: err };
    }
  }
  async getByAll(id) {
    try {
      const TraerTodo = await this.schema.find(id);

      return TraerTodo;
    } catch (err) {
      return { error: true, msg: err };
    }
  }
  async save(elemento) {
    try {
      let nuevoElemento = await this.nuevoElemento(elemento);

      return nuevoElemento;
      /*  return { success: true }; */
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteAll() {
    try {
      const TraerTodo = await this.getAll();
      for (const elemento of TraerTodo) {
        this.schema
          .deleteOne({ _id: `${elemento._id}` })
          .then((res) => {
            return { success: true, msg: 'elemento borrado' };
          })
          .catch((error) => {
            logger.log('error', '127.0.0.1 - log error', error);
            throw new err();
          });
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async deleteById(id) {
    try {
      return await this.schema.deleteOne({ _id: `${id}` });
      /*      .then(() => {
          return { success: true, msg: 'elemento borrado' };
        })
        .catch((error) => {
          logger.log('error', '127.0.0.1 - log error', error);
          throw new err();
        }); */
    } catch (err) {
      return false;
    }
  }

  async upDateById(cantidad, indiceEncontrado, _idUsuario) {
    try {
      let indice = `producto.${indiceEncontrado}.cantidad`;
      await this.schema.updateOne(
        { _id: _idUsuario },
        {
          $set: {
            [indice]: cantidad + 1,
          },
        },
      );
    } catch (error) {
      logger.log('error', '127.0.0.1 - log error', error);
    }
  }
  async upDateProduct(id, body) {
    try {
      return await this.schema.updateOne(
        { _id: `${id}` },
        {
          $set: {
            producto: body.producto,
            precio: body.precio,
            img_url: body.img_url,
            stock: body.stock,
            categoria: body.categoria,
            cantidad: 1,
          },
        },
      );
    } catch (error) {
      logger.log('error', '127.0.0.1 - log error', error);
    }
  }
  async upDatePush(id, body, _id) {
    await this.schema.updateOne(
      { _id: _id },
      {
        $push: {
          producto: [
            {
              _id: id,
              producto: body.producto,
              precio: body.precio,
              img_url: body.img_url,
              stock: body.stock,
              categoria: body.categoria,
              cantidad: 1,
            },
          ],
        },
      },
    );
  }
}
module.exports = { Contenedor };
