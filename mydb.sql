-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 10/03/2025 às 16:39
-- Versão do servidor: 9.2.0
-- Versão do PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mydb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Category`
--

CREATE TABLE `Category` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Ação'),
(5, 'Comedia'),
(6, 'Horror'),
(4, 'Romance'),
(3, 'Suspense'),
(2, 'Terror');

-- --------------------------------------------------------

--
-- Estrutura para tabela `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `User`
--

INSERT INTO `User` (`id`, `name`, `email`, `password`, `createdAt`) VALUES
(7, 'Usuário1', 'usuario1@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(8, 'Usuário2', 'usuario2@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(9, 'Usuário3', 'usuario3@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(10, 'Usuário4', 'usuario4@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(11, 'Usuário5', 'usuario5@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(12, 'Usuário6', 'usuario6@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:02.000'),
(17, 'Usuário7', 'usuario7@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:33.000'),
(18, 'Usuário8', 'usuario8@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:33.000'),
(19, 'Usuário9', 'usuario9@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:33.000'),
(20, 'Usuário10', 'usuario10@gmail.com', '$2b$10$AI33NblAhkqDBF3pNz2bAeK44LH5jhwIy/FVFSCwhxUK3tw86fEX6', '2025-03-10 16:38:33.000');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Video`
--

CREATE TABLE `Video` (
  `id` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `Video`
--

INSERT INTO `Video` (`id`, `title`, `description`, `url`, `categoryId`, `createdAt`) VALUES
(17, 'O Poderoso Chefão', 'Clássico do cinema sobre a máfia italiana nos EUA.', 'https://www.youtube.com/watch?v=sY1S34973zA', 1, '2025-03-10 16:35:14.000'),
(18, 'Interestelar', 'Ficção científica sobre viagens espaciais e buracos negros.', 'https://www.youtube.com/watch?v=mbbPSq63yuM', 2, '2025-03-10 16:35:14.000'),
(19, 'Clube da Luta', 'Um homem insatisfeito encontra um novo propósito através de lutas clandestinas.', 'https://www.youtube.com/watch?v=SUXWAEX2jlg', 3, '2025-03-10 16:35:14.000'),
(20, 'Matrix', 'Um programador descobre que a realidade é uma simulação.', 'https://www.youtube.com/watch?v=m8e-FF8MsqU', 4, '2025-03-10 16:35:14.000'),
(21, 'Coringa', 'A origem de um dos maiores vilões do Batman.', 'https://www.youtube.com/watch?v=zAGVQLHvwOY', 5, '2025-03-10 16:35:14.000'),
(22, 'Vingadores: Ultimato', 'O grande final da saga dos Vingadores contra Thanos.', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 4, '2025-03-10 16:35:14.000'),
(23, 'Batman: O Cavaleiro das Trevas', 'Batman enfrenta o Coringa em um dos filmes mais aclamados do herói.', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 5, '2025-03-10 16:35:14.000'),
(24, 'O Senhor dos Anéis: O Retorno do Rei', 'A batalha final para derrotar Sauron e destruir o Um Anel.', 'https://www.youtube.com/watch?v=r5X-hFf6Bwo', 5, '2025-03-10 16:35:14.000'),
(25, 'Django Livre', 'Um escravo liberto busca resgatar sua esposa com a ajuda de um caçador de recompensas.', 'https://www.youtube.com/watch?v=_iH0UBYDI4g', 2, '2025-03-10 16:35:14.000'),
(26, 'Gladiador', 'Um general romano busca vingança contra um imperador corrupto.', 'https://www.youtube.com/watch?v=owK1qxDselE', 3, '2025-03-10 16:35:14.000');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('8a550bf6-8ce6-4b5b-96d4-270db52e9afc', '8dfdce14a1f7f5d2dc6ff81e66642d86b60610f61dd55fab1dd4302b931abeaf', '2025-03-06 17:05:22.408', '20250306170522_init', NULL, NULL, '2025-03-06 17:05:22.135', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`);

--
-- Índices de tabela `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Índices de tabela `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Video_categoryId_fkey` (`categoryId`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `Video`
--
ALTER TABLE `Video`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `Video`
--
ALTER TABLE `Video`
  ADD CONSTRAINT `Video_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
