-- DropIndex
DROP INDEX `prestamo_equipos_deviceID_key` ON `prestamo_equipos`;

-- AlterTable
ALTER TABLE `prestamo_equipos` ADD COLUMN `DocenteResponsable` VARCHAR(100) NOT NULL DEFAULT '',
    ADD COLUMN `ModulosExpansion` VARCHAR(500) NOT NULL DEFAULT '',
    ADD COLUMN `Observacion` VARCHAR(500) NOT NULL DEFAULT '',
    MODIFY `Nombre` VARCHAR(100) NOT NULL,
    MODIFY `Direccion_IP` VARCHAR(15) NOT NULL DEFAULT 'Ninguno';

-- CreateTable
CREATE TABLE `labuser` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Lab_User` VARCHAR(20) NOT NULL,
    `Lab_Password` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
