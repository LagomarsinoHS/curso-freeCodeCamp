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

* Para levantar esto el comando es `docker compose up <nombreDelServicio>`, en este caso **dev-db** o usar el script del package.json `docker`. 

* Si es que vamos a estar trabajando con la DB, hay que levantarlo o no funcionará.



# Dependencias

|  # 	|  Nombre 	| Desc  	|
|---	|---	|---	|
|  1 	| class-transform  	| Para usar validationPipe  	|
|  2 	| Argon2  	| Para Hashear password, mejor que bcrypt  	|
|  2 	| @nest/config  	| Permite utilizar .env Revisar en app.module el configModule, el isGlobal permite usarlo en todos los modulos  	|


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

