# Aplicación de chat en tiempo real

> Puedes crear tus propios chats y colocarlos global para que cualquiera pueda acceder y hablar

### Notas:
- NO está desplegada en ningún sitio
- Está creada con PostgreSQL(Base de datos), ReactJS(Front-end), ExpressJS(servidor), Cloudinary(Archivos binarios como audios)


## 1- Inicializar proyecto  

1- clonar repositorio
```js
git clone https://github.com/dariomvg/chats-in-realtime.git
```

2- ingresar a client en la carpeta raiz del proyecto
```js
cd nombre-repositorio/client
```
2.1 - ingresar en la carpeta raiz
```js
cd nombre-repositorio
```

3- instalar en ambas carpetas(raiz y client)
```js
npm install
```

## 2- Back-end

### Necesitas crear la base de datos(con postgreSQL) con estas tablas: 

```js
CREATE TABLE chats (  
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    global BOOLEAN NOT NULL,
    date VARCHAR(255) NOT NULL
);

CREATE TABLE users (  
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES chats(id) ON DELETE CASCADE,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE messages (  
    id SERIAL PRIMARY KEY,
    chatId INT REFERENCES chats(id) ON DELETE CASCADE,
    username VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    id_audio TEXT
);

CREATE TABLE users_auth(  
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```  

### Configuraciones

> En el archivo options/config.db.js está la configuración de la base de datos, debes reemplazar con tus datos.  
> En el archivo de options/config.env.js están las variables de entorno exportadas que debes crear en tu archivo ".env".  

## 3- Visitar

### En la raiz del proyecto y en /client ejecutar:

```js
    npm run dev
```

### visitar:

#### cliente: http://localhost:5173
#### servidor: http://localhost:4000





