-- CreateTable
CREATE TABLE `feriados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Year` INTEGER UNSIGNED NOT NULL,
    `Month` INTEGER UNSIGNED NOT NULL,
    `Date` INTEGER UNSIGNED NOT NULL,
    `Nombre` TEXT NOT NULL,
    `Tipo` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `integrantes` (
    `UUID` VARCHAR(191) NOT NULL,
    `Nombre` MEDIUMTEXT NOT NULL,
    `Apellido` MEDIUMTEXT NOT NULL,
    `correo` TEXT NOT NULL,
    `Tipo` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `integrantes_UUID_key`(`UUID`),
    PRIMARY KEY (`UUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credenciales` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UUID` VARCHAR(191) NOT NULL,
    `Responsable` TEXT NOT NULL,
    `correo` TEXT NOT NULL,
    `password` TEXT NOT NULL,

    INDEX `credenciales_UUID_fkey`(`UUID`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesiones` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Year` INTEGER UNSIGNED NOT NULL,
    `Month` INTEGER UNSIGNED NOT NULL,
    `Date` INTEGER UNSIGNED NOT NULL,
    `Asunto` TEXT NOT NULL,
    `Hora_inicial` VARCHAR(5) NOT NULL,
    `Hora_final` VARCHAR(5) NOT NULL,
    `Periodicidad` VARCHAR(100) NOT NULL DEFAULT 'Ninguna',
    `Enlace` TEXT NOT NULL,
    `Responsable` VARCHAR(255) NOT NULL,
    `Correo_responsable` TEXT NOT NULL,
    `correos_invitados` TEXT NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `credenciales` ADD CONSTRAINT `credenciales_UUID_fkey` FOREIGN KEY (`UUID`) REFERENCES `integrantes`(`UUID`) ON DELETE CASCADE ON UPDATE CASCADE;
