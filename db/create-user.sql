CREATE USER 'web_client'@'localhost' IDENTIFIED WITH mysql_native_password BY 'web_client';
GRANT ALL PRIVILEGES ON * . * TO 'web_client'@'localhost';