
CREATE OR REPLACE FUNCTION insert_new_streck() RETURNS trigger AS $$
    BEGIN
            INSERT INTO History (id, time, sid, streck, item) VALUES (DEFAULT, CURRENT_DATE +1, NEW.uid, NEW.streck, NEW.item);
        IF NOT EXISTS (SELECT * FROM Strecklist WHERE sid = NEW.uid AND item=NEW.item) THEN
            RAISE NOTICE '%', NEW.streck;
            INSERT INTO Strecklist (sid, streck, item) VALUES (NEW.uid ,NEW.streck ,NEW.item);
            RETURN NEW;
        END IF;
        UPDATE Strecklist SET streck = NEW.streck + streck WHERE sid = NEW.uid AND item = NEW.item;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_streck INSTEAD OF INSERT ON NewStreckat 
    FOR EACH ROW EXECUTE FUNCTION insert_new_streck();
