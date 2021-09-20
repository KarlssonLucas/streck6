CREATE OR REPLACE VIEW streckat AS 
SELECT Users.id AS uid, streck, item
FROM Users LEFT JOIN Strecklist ON Users.id = sid;

CREATE OR REPLACE VIEW NewStreckat AS
SELECT Users.id AS uid, streck, item
FROM Strecklist LEFT JOIN Users ON Users.id = sid;

CREATE OR REPLACE VIEW HistoryView AS
SELECT History.id, time, sid, streck, name, Items.id as itemid FROM History LEFT JOIN Items ON History.item = Items.id;

CREATE OR REPLACE VIEW betaltView AS 
SELECT * From betalt;

CREATE OR REPLACE VIEW betaltById AS
SELECT Users.id as sid, COALESCE(SUM(paid),0) as paid FROM Users LEFT JOIN betalt ON Users.id=betalt.sid
GROUP BY Users.id;

CREATE OR REPLACE VIEW owed AS
SELECT streckat.uid AS uid, -SUM(COALESCE(streck*pris,0)) as pay 
FROM streckat LEFT JOIN Items ON item = Items.id
GROUP BY streckat.uid;

CREATE OR REPLACE VIEW totskuld AS
SELECT uid, pay+paid as pay
FROM owed LEFT JOIN betaltById ON sid=uid;

CREATE OR REPLACE VIEW totstreck AS
    WITH vodka AS(
        SELECT Streckat.uid AS vid, (SUM(COALESCE(streck, 0)) * 0.5) AS sumv 
        FROM streckat where item=2 group by Streckat.uid),
    other AS(
        SELECT Streckat.uid AS oid, SUM(COALESCE(streck, 0)) AS sumo
        FROM streckat where item!=2 GROUP BY Streckat.uid)
    SELECT id,login, COALESCE(sumv,0) + COALESCE(sumo,0) as sum from USERS left join vodka ON vid=id LEFT JOIN other ON oid = id;


