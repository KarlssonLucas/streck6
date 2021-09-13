import "../css/paycomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PayComponent = (props) => {
    const [skuld, setSkuld] = useState(0);

    const fetchSkuld = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/skuld/"+props.id, requestOptions).then((response : any)      => response.json()).then((response) => {
            console.log(parseInt(response[0].pay));
        setSkuld(parseInt(response[0].pay));
        });
 
    }

    const payDebt = async () => {
        const requestOptions = {
            method: 'GET',
            hearders: {'Content-Type': 'application/json' },
        };

        await fetch("/api/pay/"+props.id +"/" + parseInt(document.getElementById("inputPay").value), requestOptions).then((response : any) => response.json()).then((response) => {
            console.log("done")
            window.location.reload(false);
        });
    }

    useEffect(() => {
        fetchSkuld();
        console.log("5a9".match(/^[0-9]+$/) != null)
    }, []);
   
    return (
        <div className="">
            <input id="inputPay" key={skuld ? 'notLoadedYet' : 'loaded'} type="number" className="if" defaultValue={skuld<0 ? skuld*-1 : 0} />
            <div className="addpay" onClick= {() => document.getElementById("inputPay").value.match(/^[0-9]+$/) != null ? payDebt() : alert('hur full är du egentligen')}>Lägg till betalning</div>
        </div>
    )
}

export default PayComponent;
