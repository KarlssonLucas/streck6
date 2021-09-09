import "../css/historycomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const HistoryComponent = (props) => {
    const [hist, setHist] = useState([]);

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

    useEffect(() => {
        getHistory();
    }, []);
   
    return (
        <div>
        {hist.map(i => (
            <div key={i.id} className="history">
                <div key={i.id} className="historyitem">
                    <div className="">{i.name} {i.streck}st</div>
                    <div className="">{i.time.substring(0,10)}</div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default HistoryComponent;
