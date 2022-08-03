-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS guitar_pedals;
DROP TABLE IF EXISTS us_cities;

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    artist VARCHAR NOT NULL,
    album VARCHAR,
    length INT
);

INSERT INTO songs (title, artist, album, length) VALUES
('Transatlanticism', 'Death Cab For Cutie', 'Transatlanticism', 475),
('Dear Arkansas Daughter', 'Lady Lamb', 'After', 353),
('Put Your Records On', 'Ritt Momney', 'Put Your Records On', 210),
('Some things Cosmic', 'Angel Olsen', 'Strange Cacti', 175);

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    breed VARCHAR
);

INSERT INTO cats (name, age, breed) VALUES
('Arlop', 3, 'Lynx Point Siamese'),
('Sophie', 14, 'Maine Coon'),
('Marbles', 17, 'Mixed'),
('Cleo', 20, 'Calico');

CREATE TABLE teachers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    subject VARCHAR,
    school VARCHAR
);

INSERT INTO teachers (first_name, last_name, subject, school) VALUES
('Helen', 'Spencer-Wallace', 'Analog Modular Synthesis', 'Portland Community College'),
('Tom', 'Walsh', 'History', 'Falmouth High School'),
('Marty', 'Nelson', 'Programming', 'Alchemy Code Lab'),
('Ben', 'Mini', 'History', 'Waynflete High School');

CREATE TABLE guitar_pedals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    brand VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    price INT
);

INSERT INTO guitar_pedals (name, brand, type, price) VALUES
('Astral Destiny', 'Earthquaker Devices', 'Reverb', 199),
('Digital Delay', 'Boss', 'Delay', 190),
('Sunlight Dynamic Reverb', 'Old Blood Noise Endeavors', 'Reverb', 219),
('Alpha Haunt', 'Old Blood Noise Endeavors', 'Fuzz', 229);

CREATE TABLE us_cities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    population INT NOT NULL
);

INSERT INTO us_cities (city, state, population) VALUES
('New York City', 'New York', 8930002),
('Portland', 'Maine', 66706),
('Austin', 'Texas', 965872),
('Seattle', 'Washington', 741251);



