const socket = io();
async function categoria() {
  try {
    let categorias = document.getElementById('categoriasId');
    let categoria = categorias.value;
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({ categoria }),
    };

    await fetch('http://localhost:8080/categorias', options);
  } catch (e) {
    console.log(e);
  }
}
async function login() {
  try {
    let options = {
      method: 'post',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        nombre: document.getElementById('nombreId').value,
      }),
    };
    await fetch('http://localhost:8080/api/productos/login', options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => logger.log('error', '127.0.0.1 - log error', err));
  } catch (e) {
    console.log(e);
  }
}
async function logout() {
  try {
    let options = {
      method: 'post',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch('http://localhost:8080/api/productos/logout', options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => logger.log('error', '127.0.0.1 - log error'));
  } catch (e) {
    console.log(e);
  }
}
async function enviarMsg(id) {
  try {
    const fechaActual = Date.now();
    const fecha = new Date(fechaActual);
    const fechaFormat = fecha.toLocaleString();
    let msgUsuario = {
      _id: id,
      msgs: [
        {
          autor: {
            id: document.getElementById('email').value,
            email: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            edad: document.getElementById('edad').value,
          },
          fecha: fechaFormat,
          msg: document.getElementById('textArea').value,
        },
      ],
    };

    if (!msgUsuario.msgs) {
      msgUsuario.msgs = document.getElementById('textArea').value = '';
      return (document.getElementById('textArea').placeholder = 'escribir un aquí');
    } else {
      await socket.emit('msg', msgUsuario);
    }

    socket.on('chatLista', async (data) => {
      let htmlMsg = '';
      await data.forEach((msgData) => {
        htmlMsg += `
            <div>
            <p>${msgData.autor.email} ${msgData.fecha} dijo: ${msgData.msg}</p>
          </div>`;
      });
      document.getElementById('chatLista').innerHTML = htmlMsg;

      document.getElementById('textArea').value = '';
      await socket.emit('listaDeChats');
    });
  } catch (e) {
    console.log(e);
  }
}
async function listaDeChats() {
  try {
    await socket.emit('listaDeChats');
    socket.on('chats', async (data) => {
      let htmlChats = '';
      await data.forEach((msgData) => {
        htmlChats += `
            <div>
            <button   onclick=chateatUsuario("${msgData.id}") >${msgData.username}</button>
          </div>`;
      });
      document.getElementById('listaDeChats').innerHTML = htmlChats;
    });
  } catch (e) {
    console.log(e);
  }
}
function chateatUsuario(id) {
  try {
    socket.emit('chateatUsuario', id);
    socket.on('chatLista', (data) => {
      let htmlUsuarioMsgEnAdmin = '';
      data.forEach((msgData) => {
        htmlUsuarioMsgEnAdmin += `
        <div>
            <p>${msgData.autor.email} ${msgData.fecha} dijo: ${msgData.msg}</p>
        </div>`;
      });
      let htmlFormulario = `
      <form onsubmit="enviarMsg('${id}'); return false ">
          <label for="texto">Email</label>
          <input type="email" id="email" name="texto" placeholder="ingrese email" required></imput>
  
          <label for="nombre">nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="ingrese nombre" required></imput>
  
          <label  for="edad">edad</label>
          <input type="number" id="edad" name="edad" placeholder="ingrese edad" required></imput>
  
          <br>
          <label for="textArea">Escribir</label>
          <input type="textarea" id="textArea" placeholder="escribir aquí"></imput>
          <input type="submit" name="enviar" />
          </form> `;
      document.getElementById('formulario').innerHTML = htmlFormulario;
      document.getElementById('chatLista').innerHTML = htmlUsuarioMsgEnAdmin;
    });
  } catch (e) {
    console.log(e);
  }
}
async function cargarProductoDb() {
  try {
    const id = await document.getElementById(`_id`).value;
    if (id) {
      {
        document.getElementById(`productoId`).value = 'producto no valido';
        document.getElementById(`precioId`).value = '';
        document.getElementById(`stockId`).value = '';
        document.getElementById(`img_url`).value = '';
        document.getElementById(`categoria`).value = '';
      }
      return;
    }
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        producto: document.getElementById('productoId').value,
        precio: document.getElementById('precioId').value,
        img_url: document.getElementById('img_url').value,
        stock: document.getElementById('stockId').value,
        categoria: document.getElementById('categoria').value,
        cantidad: 1,
      }),
    };
    await fetch('http://localhost:8080/uploadfile', options);
  } catch (e) {
    console.log(e);
  }
}
const enviarProductoAlForm = async (id, stock, categoria) => {
  try {
    let productoId = (document.getElementById(`productoId`).value = document.getElementById(`productoValue${id}`).textContent);
    let precioId = (document.getElementById(`precioId`).value = document.getElementById(`precioValue${id}`).textContent);
    let stockId = (document.getElementById(`stockId`).value = stock);
    let myFileId = (document.getElementById(`img_url`).value = document.getElementById(`imgValue${id}`).src);
    let categoriaId = (document.getElementById(`categoria`).value = categoria);
    let actualizar = (document.getElementById(`_id`).value = `${id}`);
  } catch (e) {
    console.log(e);
  }
};
async function actualizarProducto() {
  try {
    const id = await document.getElementById(`_id`).value;
    if (id !== '') {
      let options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=utf-8 ' },
        body: JSON.stringify({
          producto: document.getElementById(`productoId`).value,
          precio: document.getElementById(`precioId`).value,
          stock: document.getElementById(`stockId`).value,
          img_url: document.getElementById(`img_url`).value,
          categoria: document.getElementById(`categoria`).value,
        }),
      };
      await fetch(`http://localhost:8080/${id}`, options);
    } else {
      document.getElementById(`productoId`).value = 'producto no valido';
      document.getElementById(`precioId`).value = '';
      document.getElementById(`stockId`).value = '';
      document.getElementById(`img_url`).value = '';
      document.getElementById(`categoria`).value = '';
    }
  } catch (e) {
    console.log(e);
  }
}
async function EliminarProducto(id) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/${id}`, options);
  } catch (e) {
    console.log(e);
  }
}
async function limpiarForm() {
  try {
    document.getElementById(`productoId`).value = '';
    document.getElementById(`precioId`).value = '';
    document.getElementById(`stockId`).value = '';
    document.getElementById(`img_url`).value = '';
  } catch (e) {
    console.log(e);
  }
}
async function cargarProductoCarrito(id) {
  try {
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({ id }),
    };
    await fetch('http://localhost:8080/api/carrito', options);
  } catch (e) {
    console.log(e);
  }
}
async function eliminarItemCarrito(value) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/api/carrito/item/${value}`, options);
  } catch (e) {
    console.log(e);
  }
}
async function restarItemCarrito(value) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/api/carrito/${value}`, options);
  } catch (e) {
    console.log(e);
  }
}
async function vaciarCarrito() {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };

    await fetch(`http://localhost:8080/api/carrito`, options);
  } catch (e) {
    console.log(e);
  }
}
async function finalizarCompra() {
  try {
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };

    await fetch('http://localhost:8080/finalizarcompra', options);
  } catch (e) {
    console.log(e);
  }
}
