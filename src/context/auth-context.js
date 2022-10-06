import React, { useState, useEffect } from 'react';

const defaultUserData = { id: '', name: '', email: '' };

const AuthContext = React.createContext({
  isLoggedIn: false,
  userData: defaultUserData,
  isLoading: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onUserDataUpdate: (data) => {},
});

const urlLogin = 'http://localhost:8000/api/login/';
const urlUser = 'http://localhost:8000/api/user/';
const urlLogout = 'http://localhost:8000/api/logout/';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
const loginOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  redirect: 'follow',
};
const userOptions = {
  method: 'GET',
  headers: myHeaders,
  credentials: 'include',
  redirect: 'follow',
};

export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(urlUser, userOptions)
      .then((response) => {
        if (!response.ok) {
          setHasToken(false);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUserData(defaultUserData);
          setIsLoading(false);
          return Promise.reject(response);
        }
        else return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [hasToken, isLoggedIn]);

  const handleLogout = async () => {
    await fetch(urlLogout, loginOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    localStorage.removeItem('token');
    setUserData(defaultUserData);
    setIsLoggedIn(false);
    setHasToken(false);
  };

  const updateUserData = (data) => {
    setUserData((prev) => {return {...prev, name: data.name, email: data.email}});
  }

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    const rawData = JSON.stringify({
      email: email,
      password: password,
    });

    loginOptions.body = rawData;

    // send log in request
    return await fetch(urlLogin, loginOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
          return Promise.reject(response);
        }
      })
      .then((data) => {
        // console.log(data);
        localStorage.setItem('token', data.jwt);
        setHasToken(true);
        setIsLoggedIn(true);
        console.log('logged in successfully');
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userData: userData,
        isLoading: isLoading,
        onLogout: handleLogout,
        onLogin: handleLogin,
        onUserDataUpdate: updateUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
