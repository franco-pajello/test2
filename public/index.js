/* const socket = io(); */
/* let html; */
const { logger } = require('../logs/logWinston.js');

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
    logger.log('error', '127.0.0.1 - log error', e);
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
    logger.log('error', '127.0.0.1 - log error', e);
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
    logger.log('error', '127.0.0.1 - log error', e);
  }
}

/* function enviarMsg() {
    const fechaActual = Date.now();
    const fecha = new Date(fechaActual);
    const fechaFormat = fecha.toLocaleString();
    let msgUsuario = {
        id: document.getElementById("email").value,
        autor: {
            id: document.getElementById("email").value,
            email: document.getElementById("email").value,
            nombre: document.getElementById("nombre").value,
            edad: document.getElementById("edad").value,
        },
        fecha: fechaFormat,
        msgs: document.getElementById("textArea").value,
    };

    if (!msgUsuario.msgs) {
        msgUsuario.msgs = document.getElementById("textArea").value = "";
        return (document.getElementById("textArea").placeholder =
            "escribir un aquí");
    } else {
        socket.emit("msg", msgUsuario);
    }
}

socket.on("chatLista", async (data) => {
    await data.forEach((msgData) => {
        html += `
        <div>
        <p>${msgData.autor.email} ${msgData.fecha} dijo: ${msgData.msgs}</p>
      </div>`;
    });
    document.getElementById("chatLista").innerHTML += html;

    document.getElementById("textArea").value = "";
}); */

//metodo get de home

/*  (() => {
    try {
        fetch('http://localhost:8080/api/productos')
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
                const array = data.productosArray;
          
                if (array.length > 0) {
                    let productosId = document.getElementById('productos');
                    array.forEach((produc) => {
                        productosId.innerHTML += `     <div id="productos">
                    <div > 
                    <ul>
                    <li id="productoValue${produc.id ? produc.id : produc._id
                            }" > <p>${produc.producto}</p></li>
                     <li><img id="imgValue${produc.id ? produc.id : produc._id
                            }" src=" ${produc.img_url} " alt="#" /></li>
                    <li><p>aaa a aaaaaaaaaaaa aaaa aaaaaaaa aaaaaaa</p></li>
                    <li id="stockValue${produc.id ? produc.id : produc._id}"> ${produc.stock
                            } </li>
                    <li  id="precioValue${produc.id ? produc.id : produc._id
                            }"> ${produc.precio} </li>
                    ${data.admin
                                ? `<div>
                        <button  id="btn-actualizar${produc.id ? produc.id : produc._id
                                }"  onclick=enviarProductoAlForm("${produc.id ? produc.id : produc._id
                                }")>actualizar </button>
                        <button onclick=EliminarProducto("${produc.id ? produc.id : produc._id
                                }") >Eliminar</button>
                        </div>`
                                : `<div>
                                <button onclick=cargarProductoCarrito("${produc.id ? produc.id : produc._id
                                }") >agregar al carrito</button>
                                </div>`
                            }
                            </ul> 
                            </div>
                            </div>`;
                    });
                }

                let form = document.getElementById('form');
                if (data.admin) {
                    form.innerHTML += `     <label for="producto ">producto</label>
                                        <input id="productoId" type="text" name="producto" required />
                                        <br />
                                        <label for="precio ">precio</label>
                                        <input type="text" id="precioId" name="precio" required />
                                        <br />
                                        <label for="stock ">stock</label>
                                        <input type="text" id="stockId" name="stock" required />
                                        <br />
                                        <label for="myFile">img url</label>
                                        <input type="url" id="myFileId" name="myFile" required />
                                        <br />
                                        <div>
                                        <div>
                                        <input type="submit" value="cargar un producto"  onclick=cargarProductoDb(); return false/>
                                        <button  id="actualizar" value="" onclick=actualizarProducto(value); return false >aztualizar</button> 
                                        </div>
                                        </div>
                                        <br />`;
                }
            })
            .catch((err) =>  logger.log('error', "127.0.0.1 - log error",err));
    } catch (e) {
        logger.log('error', "127.0.0.1 - log error", e);
    }
})();  */

async function cargarProductoDb() {
  try {
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({
        producto: document.getElementById('productoId').value,
        precio: document.getElementById('precioId').value,
        img_url: document.getElementById('myFileId').value,
        stock: document.getElementById('stockId').value,
        cantidad: 1,
      }),
    };
    await fetch('http://localhost:8080/api/productos/uploadfile', options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => logger.log('error', '127.0.0.1 - log error', err));
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
}

const enviarProductoAlForm = (id) => {
  try {
    let productoId = (document.getElementById(`productoId`).value = document.getElementById(`productoValue${id}`).textContent);
    let precioId = (document.getElementById(`precioId`).value = document.getElementById(`precioValue${id}`).textContent);
    let stockId = (document.getElementById(`stockId`).value = document.getElementById(`stockValue${id}`).textContent);
    let myFileId = (document.getElementById(`myFileId`).value = document.getElementById(`imgValue${id}`).src);
    let actualizar = (document.getElementById(`actualizar`).value = `${id}`);
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
};

async function actualizarProducto(id) {
  try {
    if (id) {
      let options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=utf-8 ' },
        body: JSON.stringify({
          producto: document.getElementById(`productoId`).value,
          precio: document.getElementById(`precioId`).value,
          stock: document.getElementById(`stockId`).value,
          img_url: document.getElementById(`myFileId`).value,
        }),
      };
      await fetch(`http://localhost:8080/api/productos/${id}`, options)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(
          (document.getElementById(`productoId`).value = ''),
          (document.getElementById(`precioId`).value = ''),
          (document.getElementById(`stockId`).value = ''),
          (document.getElementById(`myFileId`).value = ''),
        )
        .catch((err) => logger.log('error', '127.0.0.1 - log error', err));
    } else {
      (document.getElementById(`productoId`).value = 'producto no valido'),
        (document.getElementById(`precioId`).value = ''),
        (document.getElementById(`stockId`).value = ''),
        (document.getElementById(`myFileId`).value = '');
    }
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
}

async function EliminarProducto(id) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/api/productos/${id}`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((e) => {
        logger.log('error', '127.0.0.1 - log error', e);
      });
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
}

//metodo GET del carrito
/* (async () => {
   try {
       await fetch('http://localhost:8080/api/carrito')
           .then((res) => (res.ok ? res.json() : Promise.reject(res)))
           .then((data) => {
               const carrito = document.getElementById('carrito');
               if (data.length > 0) {
                   data.forEach((elemento) => {
                       carrito.innerHTML += `<div>
                   <div>
                   <ul>
                   <li>${elemento.producto}</li>
                   <li><img src=" ${elemento.img} " alt="#" /></li>
                   <li> ${elemento.stock} </li>
                   <li>$ ${elemento.precio}</li>
                   <li>cantidad: ${elemento.cantidad}</li>
                   <button>+</button>
                   <button>-</button>
                   <button onclick=eliminarItemCarrito("${elemento.id ? elemento.id : elemento._id
                           }")>eliminar</button>
                   </ul>
                   </div>
                   </div>
                   `;
                   });
               } else {
                   carrito.innerHTML += `<div><h4>no hay productos</h4></div>`;
               }
               carrito.innerHTML += `
               <div>
               <button onclick=vaciarCarrito()>Vaciar carrito</button>
               </div>
               `;
           });
   } catch (e) {
       logger.log('error', "127.0.0.1 - log error", e);
   }
})();  */

async function cargarProductoCarrito(id) {
  try {
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
      body: JSON.stringify({ id }),
    };
    await fetch('http://localhost:8080/api/carrito', options);
    /*  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
         .catch((e) => {
             logger.log('error', "127.0.0.1 - log error", e);
         }); */
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
}
async function eliminarItemCarrito(value) {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/api/carrito/${value}`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((e) => logger.log('error', '127.0.0.1 - log error', e));
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
  }
}
async function vaciarCarrito() {
  try {
    let options = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=utf-8 ' },
    };
    await fetch(`http://localhost:8080/api/carrito`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((e) => logger.log('error', '127.0.0.1 - log error', e));
  } catch (e) {
    logger.log('error', '127.0.0.1 - log error', e);
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
    logger.log('error', '127.0.0.1 - log error', e);
  }
}
