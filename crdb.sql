CREATE DATABASE zagidulin_test; 
\c zagidulin_test
CREATE TABLE persons
(
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(25) NOT NULL,
	secondName VARCHAR(25) NOT NULL	
);

INSERT INTO Persons (firstName, secondName) VALUES 
	('Evgeniy', 'Smirnov'),
	('Ivan', 'Korolev'),
	('Egor', 'Krasnov'),
	('John', 'Ivanov'),
	('Ivan', 'Connor'),
	('Ekaterina', 'Muhina'),
	('Olga', 'Kvasova'),
	('Dmitriy', 'Sorokin'),
	('Anna', 'Filatova');
	
CREATE TABLE debts
(
	id SERIAL PRIMARY KEY,
	personId INTEGER,
	FOREIGN KEY (personId) REFERENCES Persons (id) ON DELETE SET NULL,
	amount NUMERIC(12,2) NOT NULL,
	date DATE DEFAULT NOW()
);

INSERT INTO debts (personId, amount) VALUES
	(1, 127.22),
	(2, 66.53),
	(3, 125657.87),
	(7, 4378.45),
	(8, 646.12);	 