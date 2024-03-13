CREATE SCHEMA myuser;
SET search_path TO mydatabase, myuser;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL
);
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    location VARCHAR(100) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    num_rooms INTEGER,
    num_bathrooms INTEGER,
    area NUMERIC(10, 2),
    images TEXT[],
    user_id INTEGER REFERENCES users(id)
);
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP,
    session_duration INTERVAL,
    user_agent TEXT,
    ip_address VARCHAR(45)
);

INSERT INTO myuser.users (username, password, email)
VALUES 
    ('owner', '$2a$10$RPvPgMVqt2FlW4eiPTVWXe0BGO/4w2HN7e4ktWt3e/X4u/dzi9vHC', 'leonmsaia@gmail.com'),
    ('test', '$2a$10$RPvPgMVqt2FlW4eiPTVWXe0BGO/4w2HN7e4ktWt3e/X4u/dzi9vHC', 'mail@mail.com');

INSERT INTO myuser.properties (title, description, price, location, property_type, num_rooms, num_bathrooms, area, images, user_id)
VALUES 
    ('Casa frente al mar', 'Amplia casa con vista panorámica al océano, cuenta con 4 habitaciones, 3 baños y acceso directo a la playa.', 500000, 'Playa del Carmen, Quintana Roo, México', 'Casa', 4, 3, 300, ARRAY['1.jpg'], 1),
    ('Apartamento moderno en el centro', 'Apartamento completamente renovado en el corazón de la ciudad, cuenta con 2 habitaciones, 1 baño y una cocina abierta.', 250000, 'Nueva York, NY, Estados Unidos', 'Apartamento', 2, 1, 100, ARRAY['2.jpg'], 1),
    ('Terreno para desarrollo residencial', 'Gran terreno ubicado en zona residencial en crecimiento, ideal para construir casas o complejos de apartamentos.', 150000, 'La Plata, Buenos Aires, Argentina', 'Terreno', 0, 0, 1000, ARRAY['3.jpg'], 1),
    ('Encantadora casa de campo', 'Hermosa casa de campo rodeada de naturaleza, con 3 habitaciones, 2 baños, y amplias áreas verdes.', 300000, 'Toscana, Italia', 'Casa', 3, 2, 200, ARRAY['4.jpg'], 1),
    ('Apartamento con vistas panorámicas', 'Moderno apartamento con balcón y vistas impresionantes a las montañas, cuenta con 1 habitación, 1 baño y piscina comunitaria.', 180000, 'Denver, Colorado, Estados Unidos', 'Apartamento', 1, 1, 80, ARRAY['5.jpg'], 1),
    ('Residencia de lujo en comunidad cerrada', 'Espectacular casa de diseño moderno en comunidad cerrada, con acabados de alta gama, piscina privada y 5 habitaciones.', 1200000, 'Beverly Hills, California, Estados Unidos', 'Casa', 5, 6, 500, ARRAY['6.jpg'], 1),
    ('Loft en antigua fábrica restaurada', 'Loft espacioso con techos altos y diseño industrial, ubicado en una antigua fábrica reacondicionada, ideal para artistas o profesionales creativos.', 350000, 'Berlín, Alemania', 'Loft', 1, 1, 150, ARRAY['7.jpg'], 1),
    ('Mansión histórica restaurada', 'Impresionante mansión del siglo XIX completamente restaurada, ubicada en el corazón del centro histórico, con 8 habitaciones, jardín y vistas a la ciudad.', 2500000, 'París, Francia', 'Casa', 8, 5, 600, ARRAY['8.jpg'], 1),
    ('Apartamento de alto standing en rascacielos', 'Exclusivo apartamento en una de las torres más emblemáticas de la ciudad, con servicios de lujo y vistas panorámicas, cuenta con 3 habitaciones y 3 baños.', 3000000, 'Dubai, Emiratos Árabes Unidos', 'Apartamento', 3, 3, 300, ARRAY['9.jpg'], 1),
    ('Finca vitivinícola en el valle', 'Finca con viñedo en producción y bodega equipada, rodeada de paisajes espectaculares, ideal para producción de vino o turismo rural.', 1800000, 'Mendoza, Argentina', 'Finca', 0, 0, 100000, ARRAY['10.jpg'], 1);

