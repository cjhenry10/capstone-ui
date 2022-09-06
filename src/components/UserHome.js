import React from 'react'

export default function UserHome() {

  // const jwt = localStorage.getItem('loginKey');
  const url = `http://localhost:8000/api/user/`;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  // myHeaders.append('Authorization', jwt);
  // myHeaders.append('X-CSRF-Token', localStorage.getItem('csrftoken'));

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
      // credentials: 'include',
      redirect: 'follow',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {throw err});


  return (
    <div>Logged in</div>
  )
}
