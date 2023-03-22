const usuarioRequire = require('../../contenedores/contenedorFirebase.js');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

class Usuario extends usuarioRequire.Contenedor {
  constructor() {
    super('usuarios');
  }

  async userr(id) {
    try {
      const res = await db.collection('usuarios').where('username', '==', `${id}`).get();

      const user = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      let userr = user[0];

      return userr;
    } catch (err) {
      return { error: true, msg: err };
    }
  }
}

/* const Usuarios = new Usuario() */

module.exports = new Usuario();
