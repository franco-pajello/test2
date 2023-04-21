const { model } = require('mongoose');
const { logger } = require('../logs/logWinston.js');

const { Singleton } = require('../utils/connectToMongo.js');

class Contenedor {
  constructor(schema, modelo, nuevoElemento) {
    this.modelo = modelo;
    this.nuevoElemento = nuevoElemento;
    this.schema = model(schema, modelo);
  }

  async getAll() {
    await Singleton.getInstance();
    try {
      const arrayDeElementos = await this.schema.find({});
      return arrayDeElementos;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getById(id) {
    try {
      const TraerTodo = await this.schema.findById({ _id: `${id}` });
      return TraerTodo;
    } catch (err) {
      return undefined;
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
      return this.schema.deleteOne({ _id: `${id}` });
    } catch (err) {
      return false;
    }
  }
}
module.exports = { Contenedor };
