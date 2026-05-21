-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema solosmart
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema solosmart
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `solosmart` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `solosmart` ;

-- -----------------------------------------------------
-- Table `solosmart`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `solosmart`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



SELECT * FROM solosmart.users;


CREATE TABLE IF NOT EXISTS `solosmart`.`analises_ia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total_deteccoes` INT DEFAULT 0,
  `resultado_json` JSON NOT NULL,
  `imagem_base64` LONGTEXT NULL,
  `created_at` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `fk_analise_user` (`user_id`),
  CONSTRAINT `fk_analise_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;


CREATE TABLE IF NOT EXISTS `solosmart`.`sensor_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `umidade` FLOAT NOT NULL,
  `temperatura` FLOAT NULL,
  `created_at` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `fk_sensor_user` (`user_id`),
  CONSTRAINT `fk_sensor_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;