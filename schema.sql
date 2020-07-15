
DROP TABLE IF EXISTS bookdb;

CREATE TABLE bookdb(
    id SERIAL PRIMARY KEY,
    author VARCHAR (255),
    title VARCHAR (255),
    book_description TEXT, 
    isbn VARCHAR (255),
    bookshelf VARCHAR(255)
);
