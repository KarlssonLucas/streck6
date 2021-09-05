CREATE OR REPLACE VIEW streckat AS 
SELECT Users.id AS uid, streck, item
FROM Users LEFT JOIN Strecklist ON Users.id = sid;

CREATE OR REPLACE VIEW NewStreckat AS
SELECT Users.id AS uid, streck, item
FROM Strecklist LEFT JOIN Users ON Users.id = sid;

CREATE OR REPLACE VIEW betalt AS 
SELECT Users.id AS uid, 0 as paid
FROM Users;

CREATE OR REPLACE VIEW totskuld AS
SELECT streckat.uid AS uid, -SUM(COALESCE(streck*pris,0)) + paid as pay 
FROM streckat LEFT JOIN Items ON item = Items.id
LEFT JOIN betalt ON Streckat.uid = betalt.uid
GROUP BY streckat.uid, betalt.paid;

CREATE OR REPLACE VIEW totstreck AS
SELECT uid, SUM(COALESCE(streck, 0)) 
FROM streckat GROUP BY uid;

