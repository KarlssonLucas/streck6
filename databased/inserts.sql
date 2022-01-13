-- DEFAULT ItemName Price
INSERT INTO Items VALUES(DEFAULT,'Item', 6);
INSERT INTO Items VALUES(DEFAULT,'Item1', 10);
INSERT INTO Items VALUES(DEFAULT,'Item2', 15);

-- Admin for highest privilege and other for regular users
INSERT INTO Roles VALUES(1, 'admin');
INSERT INTO Roles VALUES(2, 'other');

-- Keep the password, it is ' ' when logging in and let the users change it themselves
-- DEFAULT ROLE NAME PASSWORD (keep the password that i've used with my name)
INSERT INTO Users VALUES(DEFAULT, 1, 'kakan', '$2b$10$bjbPS.NkaQc80DISDJ9guuyHIdaiYBRkSW2nrfA.2wGLfx7fcfQvK');