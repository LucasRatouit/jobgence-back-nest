CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, password)
VALUES
( 'Mathéo', 'Garry' )
( 'Lucas', 'test' );