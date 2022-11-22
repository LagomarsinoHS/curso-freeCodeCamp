# Docker

* Se instaló docker y se creo un archivo llamado `docker-compose.yml`. 
* En este archivo se especificó algunas cosas,

|  # 	|  Nombre 	| Desc  	|
|---	|---	|---	|
|  1 	| Image  	| Se indica la imagen para que docker la descargue  	|
|  2 	| Ports  	| Se indica los puertos que utilizará la imagen  	|
|  3 	| Environment  	| Aqui pones las variables de entorno que utilizará  	|

* Esta imagen tiene predefinida una base de datos, con datos de prueba y todo listo y montado. En el `.env` esta la url para conectarse a la BD
`DATABASE_URL="postgresql://<USER>:<Password>@localhost:<Port>/<DBName>?schema=public"`

* Esta información se consigue desde `docker-compose.yml`

* Para levantar esto el comando es `docker compose up <nombreDelServicio>`, en este caso **dev-db** o usar el script del package.json `docker`. 

* Si es que vamos a estar trabajando con la DB, hay que levantarlo o no funcionará.



# Dependencias

|  # 	|  Nombre 	| Desc  	|
|---	|---	|---	|
|  1 	| class-transform  	| Para usar validationPipe  	|
|  2 	| Argon2  	| Para Hashear password, mejor que bcrypt  	|
|  3 	| @nest/config  	| Permite utilizar .env Revisar en app.module el configModule, el isGlobal permite usarlo en todos los modulos  	|
|  4 	| @nestjs/passport and  passport  	| To handle authentication
|  5 	| @nestjs/jwt passport-jwt  	| Para usar jwt
|  6 	| @pactumJs  	| Para hacer testing en todos los niveles
|  7 	| dotenv-cli  	| Para utilizar comandos en los scripts e indicar que .env debe usar




# Prisma

## Commands
|  # 	|  Command 	| Desc  	|
|---	|---	|---	|
|  1 	| npx prisma migrate dev  	| Para migrar y crear .sql de las tablas  	|
|  2 	| npx prisma generate  	| Crea types de ts para los modelos de prisma 	|
|  3 	| npx prisma studio  	| Abre una web con los datos de la DB 	|
|  4 	| prisma migrate deploy 	| Aplica los cambios hechos en el modelo en la nueva migración 	|


# Levantar el servicio

1. Primero se debe borrar e iniciar docker, para esto generamos un script en los scripts del package.json

    `npm run db:dev:restart`

2. Migrar las tablas ya hechas con el script:

    `npm run prisma:dev:deploy`

3. Levantar el servicio

    `npm run start:dev`

# Auth/ strategy

    En esta carpeta se creo un archivo `jwt.strategy.ts`. Esto es para indicarle a nuestro servidor que cada petición vendrá con un token Bearer, en el caso de que no corresponda o este vencido no permitirá entrar.

    Además de la definición de este archivo se necesita agregar como proveedor en `auth.module.ts`


# Pactum

    Finalmente se hicieron todas las pruebas de lo que viene siendo el CRUD.
    En el archivo app.es2-spec.ts podemos encontrar todo estó, el modo de uso de pactum y las pruebas


* Para Correr la base de datos de test (prisma studio)
    
    * npx dotenv -e -env-test prisma studio. Esto abrira una pagina con los valores de la BD
    * npm run test:e2e Este script bajara el docker compose, lo subirá, limpiará la BD y estara en modo watch para ver las pruebas