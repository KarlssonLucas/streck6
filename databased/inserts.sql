-- DEFAULT ItemName Price
INSERT INTO Items VALUES(DEFAULT,'Svartøhl', 1, 6);
INSERT INTO Items VALUES(DEFAULT,'Vodka 2cl', 0.5, 4);
INSERT INTO Items VALUES(DEFAULT,'Gin 4cl', 1, 8);
INSERT INTO Items VALUES(DEFAULT,'Rom 4cl', 1, 8);
INSERT INTO Items VALUES(DEFAULT,'Svartcider', 1, 10);
INSERT INTO Items VALUES(DEFAULT,'Billys', 0, 20);
INSERT INTO Items VALUES(DEFAULT,'PK', 0, 6);
INSERT INTO Items VALUES(99, 'Inbetalning', 0, 0);

-- Admin for highest privilege and other for regular users
INSERT INTO Roles VALUES(1, 'admin');
INSERT INTO Roles VALUES(2, 'sexIT');
INSERT INTO Roles VALUES(3, 'exIT');

-- Keep the password, it is ' ' when logging in and let the users change it themselves
-- DEFAULT ROLE NAME PASSWORD (keep the password that i've used with my name)
INSERT INTO Users VALUES(DEFAULT, 1, 'krizzly', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'gubbe', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'haren', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'muu', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'zorro', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'fabbo', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'jonte', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
INSERT INTO Users VALUES(DEFAULT, 2, 'ping', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');
