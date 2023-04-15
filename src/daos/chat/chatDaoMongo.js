const chatRequire = require('../../contenedores/contenedorMongo.js');
const modelo = require('../../models/chat.js').modeloDelchat;
async function nuevoElemento(elemento, _id) {
  const nuevoElemento = new this.schema({
    _id: _id,
    msgs: [
      {
        autor: {
          id: elemento.msgs[0].autor.email,
          email: elemento.msgs[0].autor.email,
          nombre: elemento.msgs[0].autor.nombre,
          edad: elemento.msgs[0].autor.edad,
        },
        fecha: elemento.msgs[0].fecha,
        msg: elemento.msgs[0].msg,
      },
    ],
  });
  await nuevoElemento.save();
}
class chatDaosMongo extends chatRequire.Contenedor {
  constructor() {
    super('chat', modelo, nuevoElemento);
  }
  async save(elemento, _id) {
    try {
      await this.nuevoElemento(elemento, _id);

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async upDatePush(elemento, _id) {
    await this.schema.updateOne(
      { _id: _id },
      {
        $push: {
          msgs: [
            {
              autor: {
                id: elemento.msgs[0].autor.email,
                email: elemento.msgs[0].autor.email,
                nombre: elemento.msgs[0].autor.nombre,
                edad: elemento.msgs[0].autor.edad,
              },
              fecha: elemento.msgs[0].fecha,
              msg: elemento.msgs[0].msg,
            },
          ],
        },
      },
    );
  }
}

module.exports = { chatDaosMongo };
