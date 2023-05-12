# Ecommerce
## _Franco Pajello_
Ecommerce en capas MVC basado en node.js y express .
## Tecnologia
se utiliza una serie de proyectos de código abierto para funcionar correctamente:
- [JavaScript] -
- [node.js] 
- [Express] 
- [Ejs] 
- [Socket io] 
- [Passport] 
## Características de la pagina web
test2-production-6e0f.up.railway.app

Página de inicio:

```sh
contiene la información del usuario logeado junto a un catálogo de productos que se pueden filtrar por categorías además de agregar el producto al carrito y comunicarse con soporte mediante un chat 
```

Página del carrito:

```sh
En la misma podemos encontrar los producto seleccionados por el usuario, al cual desde allí
mismo podemos sumar, restar o eliminar dicho producto,
también podremos apreciar el botón para finalizar la compra
```
## Como levantar el proyecto 
✨Se recomienda al momento de descargar las dependencias para el proyecto utilizar npm ci
#### Modo Desarrollo

```sh
npm run dev
```
#### Modo Producción

```sh
npm run prod
```
## Testing de productos 
Levantar el proyecto en modo dev o prod y en otra terminal ejecutar npm run test
```sh
npm run dev / npm run prod
```
```sh
npm run test
```
## Variables de entorno
#### En producción 
En un archivo produccion.env
|Nombre | Valor |
| ------ | ------ |
| NODE_ENV | "produccion"|
| PORT | "8082"|
| TIPO_PERSISTENCIA| "mongo" |
| EMAILADMIN | xxxxxx |
| PASSEMAILADMIN | xxxxx |
| HOST | 'mongodb+srv://franco-pajello:pTtXmDnVqw33o5Qx@cluster0.8t2nx9j.mongodb.net/ecommerce' |
| LOCALHOST | "127.0.0.1"|
| TEST | "false"|
| PASSWORDREDIS | xxxxx |
| HOSTREDIS | url de redis |
| ACCOUNTSIDTWILIO |xxx|
| AUTHTOKENTWILIO | xxx|
| MESSAGINGSERVICESID |xxx|
| CLIENTMESSAGESTO |xxx|
| WHATSAPPTWILIOFROM |xxx|
| WHATSAPPTWILIOTO | xxx|
#### En Desarrollo 
En un archivo dev.env
|Nombre | Valor |
| ------ | ------ |
| NODE_ENV | "dev"|
| PORT | "8080"|
| TIPO_PERSISTENCIA| "mongo" |
| EMAILADMIN | xxxxxx |
| PASSEMAILADMIN | xxxxx |
| HOST | 'mongodb+srv://franco-pajello:pTtXmDnVqw33o5Qx@cluster0.8t2nx9j.mongodb.net/ecommerce' |
| LOCALHOST | "127.0.0.1"|
| TEST | "false"|
| PASSWORDREDIS | xxxxx |
| HOSTREDIS | url de redis |
 ACCOUNTSIDTWILIO |xxx|
| AUTHTOKENTWILIO | xxx|
| MESSAGINGSERVICESID |xxx|
| CLIENTMESSAGESTO |xxx|
| WHATSAPPTWILIOFROM |xxx|
| WHATSAPPTWILIOTO | xxx|

## Usuarios creados
#### Admin
|Nombre | Valor |
| ------ | ------ |
| nombre | admin|
| email | admin@gmail.com|
| contraseña| admin |
|Nombre | Valor |
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