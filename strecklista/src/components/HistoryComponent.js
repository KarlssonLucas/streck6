import "../css/historycomponent.css";
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    paper: {
        backgroundColor: 'red'
    },
});

const HistoryComponent = (props) => {
    const [hist, setHist] = useState([]);
    const classes = styles();

    const getHistory = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/history/"+props.id, requestOptions).then((response : any) => response.json()).then((response) => {
            console.log(response);
            setHist(response);
        });
    }

    const removeFromHistory = async (hid, amount, itemid) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/remove/"+props.id+"/"+hid+"/"+itemid+"/"+amount, requestOptions).then((response : any) => response.json()).then((response) => {
            console.log(response);
            window.location.reload(false);
        });
    }

    useEffect(() => {
        getHistory();
    }, []);
   
    return (
        <div>
        {hist.slice(0).reverse().map(i => (
            <div key={i.id} className="history">
                <Paper elevation={3} classes={classes.paper}/>
            </div>
            ))}
        </div>
    )
}
/*
<div key={i.id} className="historyitem">
                    <div className="">{i.name} </div>
                    <div className=""> {i.streck}{i.name === "Inbetalning" ? "kr" : "st"}  </div>
                    <div className="">{i.time.substring(0,10)}</div>
                </div>
                <div className="removeButton" onClick={() => removeFromHistory(i.id, i.streck, i.itemid)}> Delete </div>
                */

export default HistoryComponent;
