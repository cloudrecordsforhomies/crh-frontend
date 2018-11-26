LOAD DATA LOCAL INFILE 'users.csv' INTO TABLE User FIELDS TERMINATED BY "," LINES TERMINATED BY "\r\n" (first,last,email,password,phone,profPic);
LOAD DATA LOCAL INFILE 'bookings.csv' INTO TABLE Booking FIELDS TERMINATED BY "," LINES TERMINATED BY "\r\n" (hostId, renterId, picture, squareFeet, latitude, longitude, address, startTime, endTime, status);
