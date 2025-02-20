# Aplicación de chat en tiempo real

> Puedes crear tus propios chats con una contraseña, dónde otros usuarios podrán ingresar siempre que tengan la contraseña.

### Notas:
- NO está desplegada en ningún sitio
- Está creada con PostgreSQL(Base de datos), ReactJS(Front-end) y ExpressJS(servidor)

## 1- Inicializar proyecto

- a. Front-end:
- 
``js
    npm i vite@latest
``

``js
    npm i react-router-dom socket.io-client
``



# ver realtime envio de mensajes
  

export const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "realtime",
    username: "postgres",
    password: "1917",
  });
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








