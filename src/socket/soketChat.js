const { resultado } = require('../daos/iteradorDeInstancia.js');
const chat = new resultado.chat();

module.exports = function (io) {
  io.on('connection', (Socket) => {
    Socket.on('msg', async (data) => {
      const id = data._id;
      const buscandoMsgs = await chat.getById(id);
      if (buscandoMsgs == null || buscandoMsgs == undefined) {
        await chat.save(data, id);
      } else {
        await chat.upDatePush(data, id);
      }
      const todoElChat = await chat.getById(id);
      let array = todoElChat;
      await io.sockets.emit('chatLista', array.msgs);
    });

    Socket.on('listaDeChats', async () => {
      const buscandoMsgs = await chat.getAll();
      const chats = [];
      await buscandoMsgs.forEach((e) => {
        chats.push({ id: e._id, username: e.msgs[0].autor.nombre });
      });
      io.sockets.emit('chats', chats);
    });
    Socket.on('chateatUsuario', async (id) => {
      const buscandoMsgs = await chat.getById(id);
      let array = buscandoMsgs;
      io.sockets.emit('usuarioChateat', array.msgs);
    });
  });
};
