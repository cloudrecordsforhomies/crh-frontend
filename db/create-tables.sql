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
  CONSTRAINT uPK PRIMARY KEY (uId, email)
);

CREATE TABLE ConfirmedBooking(
  bId INT NOT NULL AUTO_INCREMENT,
  renterId INTEGER NOT NULL,
  hostId INTEGER NOT NULL,
  picture VARCHAR(255),
  startTime BIGINT NOT NULL,
  endTime BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  squareFeet INTEGER NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  CONSTRAINT bPK PRIMARY KEY (bId),
  CONSTRAINT rFK FOREIGN KEY (renterId) REFERENCES User(uId),
  CONSTRAINT hFK FOREIGN KEY (hostID) REFERENCES User(uId)
);

CREATE TABLE UnconfirmedRentSideBooking(
  bId INT NOT NULL AUTO_INCREMENT,
  renterId INT NOT NULL,
  squareFeet INT NOT NULL,
  radius DECIMAL,
  centerLatitude DECIMAL,
  centerLongitude DECIMAL,
  startTime BIGINT NOT NULL,
  endTime BIGINT NOT NULL,
  CONSTRAINT ursbPK PRIMARY KEY (bId),
  CONSTRAINT rsFK FOREIGN KEY (renterId) REFERENCES User(uId)
);

CREATE TABLE UnconfirmedHostSideBooking(
  bId INT NOT NULL AUTO_INCREMENT,
  hostId INT NOT NULL,
  picture VARCHAR(255),
  squareFeet INT NOT NULL,
  latitude DECIMAL(6,3) NOT NULL,
  longitude DECIMAL(6,3) NOT NULL,
  address VARCHAR(255),
  startTime BIGINT NOT NULL,
  endTime BIGINT NOT NULL,
  CONSTRAINT uhPK PRIMARY KEY (bId),
  CONSTRAINT hsFK FOREIGN KEY (hostId) REFERENCES User(uId)
);

/* CREATE TABLE Claims();
