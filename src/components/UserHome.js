import React from 'react'

export default function UserHome() {

  const [userData, setuserData] = React.useState({
    id: "",
    name: "",
    email: "",
  })

  React.useEffect(() => {
    const url = `http://localhost:8000/api/user/`;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    fetch(url, {
      method: 'GET',
      headers: myHeaders,
      credentials: 'include',
      redirect: 'follow',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setuserData(data);
    })
    .catch(err => {throw err});
  }, []);

  return (
    <div>
      <p>Logged In</p>
      <p>User: {userData.name}</p>
    </div>
  )
}
