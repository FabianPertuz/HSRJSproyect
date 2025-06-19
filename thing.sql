-- Database initialization script
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(50) NOT NULL,
    rarity INTEGER NOT NULL CHECK (rarity IN (4, 5)),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE light_cones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(50) NOT NULL,
    rarity INTEGER NOT NULL CHECK (rarity IN (3, 4, 5)),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE relics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    set_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO characters (name, path, rarity, description) VALUES
('Kafka', 'Nihility', 5, 'A member of the Stellaron Hunters who is calm, collected, and beautiful.'),
('Silver Wolf', 'Nihility', 5, 'A genius hacker who can edit the data of reality.');

INSERT INTO light_cones (name, path, rarity, description) VALUES
('Patience Is All You Need', 'Nihility', 5, 'Increases the wearer''s Effect Hit Rate.'),
('Eyes of the Prey', 'Nihility', 4, 'Increases the wearer''s Effect Hit Rate and DoT damage.');

INSERT INTO relics (name, type, set_name, description) VALUES
('Band''s Solar Sash', 'Body', 'Band of Sizzling Thunder', 'Increases Lightning DMG.'),
('Band''s Polarized Sunglasses', 'Head', 'Band of Sizzling Thunder', 'Increases ATK.');