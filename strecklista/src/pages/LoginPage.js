import fetch from "node-fetch";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../css/loginpage.css";

const useLoginHook = (formValues) => {
  const [values, handleChange] = useState(formValues);

  return [values, e => {
    handleChange({
      ...values,
      [e.target.name]: e.target.value
    });
  }];
};

const LoginPage = (props) => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [correctCredentials, setCorrectCredentials] = useState(false);
  
  const [credentials, setCredentials] = useLoginHook({
    login: "null",
    password: null
  });

  const history = useHistory();

  useEffect(() => {
    if (props.logout === true) {
      fetch("/api/logout").then(response => response.json()).then(response => {
        history.push('/')
        window.location.reload();
      })
    }
    else {
      fetch("/api/session").then(response => response.json()).then(response => {
        if (response.login === true) {
          setLoggedIn(true);
        }
      });
    }
  }, [])

  const login = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    };

    console.log("SEND", requestOptions.body)

    fetch("/api/login", requestOptions).then(response => response.json()).then(response => {
      if (response === true) {
        setWrongCredentials(false);
        setCorrectCredentials(true);
    }
      else {
        setWrongCredentials(true);
        console.log(response.error);
      }

    })

  };

  const loginForm = (e) => {
    if (e.key === 'Enter') {
      login()
    } 
  }

  return (
    <div className="loginpage">
        <form className="test">
          <div className="">
            <input id="username" name="login" type="text" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} placeholder="Username" />
            <input id="password" name="password" type="password" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} placeholder="Password"/>
          </div>
          <button class="loginbutton" onClick={() => login()}>Logga in</button>
        </form>
    </div>
  
  )
};

export default LoginPage;