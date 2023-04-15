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

  async deleteByIdCarrito(idCarrito, indiceEncontrado, producto) {
    try {
      let indice = `producto.${indiceEncontrado}.cantidad`;
      let cantidad = producto.cantidad;
      if (producto.cantidad > 1) {
        return await this.schema.updateOne(
          { _id: idCarrito },
          {
            $set: {
              [indice]: cantidad - 1,
            },
          },
        );
      }
      return;
    } catch (err) {
      return false;
    }
  }
  async deleteItem(idCarrito, producto) {
    try {
      let prodId = producto._id;
      return await this.schema.updateOne(
        { _id: idCarrito },
        {
          $pull: { producto: { _id: prodId } },
        },
      );
    } catch (err) {
      return false;
    }
  }
  async deleteById(id) {
    try {
      return this.schema.deleteOne({ _id: `${id}` });
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
            _id: body._id,
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
