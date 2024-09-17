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








