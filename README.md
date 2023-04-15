# Ecommerce
## _Franco Pajello_
Ecommerce en capas MVC basado en node.js y express con Mondo Atlas como base de datos.
## Tecnologia
se utiliza una serie de proyectos de código abierto para funcionar correctamente:
- [JavaScript] 
- [node.js] 
- [Express] 
- [Ejs] 
- [Socket io] 
- [Passport] 
## Caracteristicas de la pagina web
 https://test2-production-45fe.up.railway.app/

Pagina de inicio:

```sh
contiene la informacion del usuario logeado junto a un catalogo de productos que se pueden
filtrar por categorias ademas de agregar el prodcto al carrito y comunicarse con soporte 
mediante un chat 
```

Pagina del carrito:

```sh
en la misma podemos encontrar los producto seleccionados por el usuario, al cual desde alli
mismo podemos sumar, restar o eliminar dicho producto tambien podremos apreciar el boton 
para finalizar la compra
```
## Como levantar el proyecto 
✨Se recomienda al momento de descargar las dependencias para el proyecto utilizar npm ci
#### Modo Desarrollo

```sh
npm run dev
```
#### Modo Produccion

```sh
npm run prod
```
## Variables de entorno
#### En produccion 
En un archivo produccion.env
|Nombre | Valor |
| ------ | ------ |
| NODE_ENV | "produccion"|
| PORT | "8082"|
| TIPO_PERSISTENCIA| "mongo" |
| EMAILADMIN | xxxxxx |
| PASSEMAILADMIN | xxxxx |
| HOST | url de mongo |
| LOCALHOST | "127.0.0.1"|
#### En Desarrollo 
En un archivo dev.env
|Nombre | Valor |
| ------ | ------ |
| NODE_ENV | "dev"|
| PORT | "8080"|
| TIPO_PERSISTENCIA| "mongo" |
| EMAILADMIN | xxxxxx |
| PASSEMAILADMIN | xxxxx |
| HOST | url de mongo |
| LOCALHOST | "127.0.0.1"|

## Usuarios creados
#### Admin
|Nombre | Valor |
| ------ | ------ |
| nombre | admin|
| email | admin@gmail.com|
| contraseña| admin |
#### Usuario1
|Nombre | Valor |
| ------ | ------ |
| nombre | usuario1|
| email | usuario1@gmail.com|
| contraseña| usuario1 |
#### Usuario2
|Nombre | Valor |
| ------ | ------ |
| nombre | usuario2|
| email | usuario2@gmail.com|
| contraseña| usuario2 |

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Ejs]: <https://github.com/mde/ejs>
   [JavaScript]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
   [Passport]: <https://www.passportjs.org/docs/>
   [Socket io]: <https://socket.io/docs/v4/>