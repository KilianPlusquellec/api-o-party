CREATE TABLE Utilisateur (
    ID_Utilisateur INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50),
    Prénom VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    MotDePasse VARCHAR(255)
);

CREATE TABLE Lieu (
    ID_Lieu INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100),
    Adresse VARCHAR(255),
    Ville VARCHAR(50),
    Pays VARCHAR(50)
);

CREATE TABLE Événement (
    ID_Événement INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100),
    Description TEXT,
    Date DATE,
    Heure TIME,
    ID_Lieu INT,
    FOREIGN KEY (ID_Lieu) REFERENCES Lieu(ID_Lieu)
);

CREATE TABLE Participation (
    ID_Participation INT PRIMARY KEY AUTO_INCREMENT,
    ID_Utilisateur INT,
    ID_Événement INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Événement) REFERENCES Événement(ID_Événement)
);

CREATE TABLE Équipe (
    ID_Équipe INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100)
);

CREATE TABLE Développeur (
    ID_Développeur INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50),
    Prénom VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    ID_Équipe INT,
    FOREIGN KEY (ID_Équipe) REFERENCES Équipe(ID_Équipe)
);
