CREATE DATABASE nutrition;

USE nutrition;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(31) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    obj_kcal INT,
    obj_carb INT,
    obj_prot INT,
    obj_fats INT,
    PRIMARY KEY (id)
);

CREATE TABLE foods (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(63) NOT NULL,
    kcal INT NOT NULL,
    carb INT NOT NULL,
    prot INT NOT NULL,
    fats INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE meals (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(63) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_food_meal (
    id INT NOT NULL AUTO_INCREMENT,
    user INT NOT NULL,
    food INT NOT NULL,
    meal INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (food) REFERENCES foods(id),
    FOREIGN KEY (meal) REFERENCES meals(id)
);

DESCRIBE users;

INSERT INTO users VALUES (1, "Alzuco1234", "Alzuco1234", "Alzuco Gomez");