-- TABLE USERS
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

INSERT INTO Users (name, password)
VALUES
( 'Mathéo', 'Garry' ),
( 'Lucas', 'test' );
----------

-- TABLE ENTREPRISES
CREATE TABLE Entreprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    siret VARCHAR(100),
    localisation VARCHAR(100),
    type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

INSERT INTO Entreprises (name, siret, localisation, type)
VALUES
('NeilaCorp', '362 521 879 00034', 'Paris', 'ENTREPRISE'),
('IssouCorp', '951 159 879 00043', 'Tours', 'ENTREPRISE');
----------
