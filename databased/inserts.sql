-- DEFAULT ItemName Price
INSERT INTO Items VALUES(DEFAULT,'Svartøhl', 6);
INSERT INTO Items VALUES(DEFAULT,'Vodka 2cl', 4);
INSERT INTO Items VALUES(DEFAULT,'Gin 4cl', 8);
INSERT INTO Items VALUES(DEFAULT,'Rom 4cl', 8);
INSERT INTO Items VALUES(DEFAULT,'Svartcider', 10);
INSERT INTO Items VALUES(DEFAULT,'Billys', 20);
INSERT INTO Items VALUES(DEFAULT,'PK', 6);

-- Admin for highest privilege and other for regular users
INSERT INTO Roles VALUES(1, 'admin');
INSERT INTO Roles VALUES(2, 'other');

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
