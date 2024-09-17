# Aplicación de chat en tiempo real

> Puedes crear tus propios chats privados e invitando a quien quieras, donde otros usuarios podrán ingresar siempre que tengan la contraseña del chat.

### Notas:
- NO está desplegada en ningún sitio
- Está creada con PostgreSQL(Base de datos), ReactJS(Front-end) y ExpressJS(servidor)


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

### Necesitas crear las bases de datos, con postgreSQL: 

```js
CREATE TABLE chats (  
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    creator VARCHAR(255) NOT NULL
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
    messages VARCHAR(255) NOT NULL
);
```

### En el archivo de configDB.js esta la configuración de la base de datos, debes reemplazar con tus datos:

```js
// reemplazar con tus datos
export const sql = postgres({
    host: "***",
    port: ***,
    database: "***",
    username: "***",
    password: "***",
  });
```

## 3- Visitar

### En la raiz del proyecto y en client ejecutar:

```js
    npm run dev
```
### visitar: http://localhost:5173





