CREATE DATABASE cache;

USE cache;

CREATE TABLE User(
  uId INT NOT NULL AUTO_INCREMENT,
  first VARCHAR(255),
  last VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(255),
  profPic VARCHAR(255),
  saves VARCHAR(255),
  CONSTRAINT uPK PRIMARY KEY (uId)
);

CREATE TABLE Booking(
  bId INT NOT NULL AUTO_INCREMENT,
  renterId INT,
  hostId INT,
  picture VARCHAR(255),
  startTime INT,
  endTime INT,
  address VARCHAR(255),
  squareFeet INT,
  latitude FLOAT(5),
  longitude FLOAT(5),
  status TINYINT,
  price FLOAT(2),
  CONSTRAINT bPK PRIMARY KEY (bId),
  CONSTRAINT rFK FOREIGN KEY (renterId) REFERENCES User(uId),
  CONSTRAINT hFK FOREIGN KEY (hostID) REFERENCES User(uId)
);
