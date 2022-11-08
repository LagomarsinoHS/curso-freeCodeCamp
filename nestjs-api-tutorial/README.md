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