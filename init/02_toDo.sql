-- TABLE USERS
CREATE TABLE Todo (
    id SERIAL PRIMARY KEY,
    value VARCHAR(100),
    done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

INSERT INTO Todo (value)
VALUES
( 'test' );
----------
