import React, { useEffect, useState } from 'react';
import convertDate from '../helpers/convertDate';

// WORK IN PROGRESS
const rolesUrl = 'http://localhost:8000/api/roles/';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const convertAllDates = (data) => {
  const newData = [...data];
  newData.forEach(item => {
    if ('creation_timestamp' in item) {
      item.creation_timestamp = convertDate(item.creation_timestamp);
    } if ('modification_timestamp' in item) {
      item.modification_timestamp = convertDate(item.modification_timestamp);
    }
  })
  return newData;
}

const useApi = (url, method, body) => {
  // console.log(url);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleData, setRoleData] = useState(null);
  
  const options = {
    method: 'GET',
    headers: myHeaders,
    credentials: 'include',
    redirect: 'follow',
  };

  const fetchOne = async (apiUrl=url, method, body) => {
    // console.log('url', apiUrl)
    // console.log('method: ', method)
    // console.log('body: ', body)
    if (method) {
    switch (method.toLowerCase()) {
      case 'post':
        options.method = 'POST';
        options.body = JSON.stringify(body);
        break;
      case 'put':
        options.method = 'PUT';
        options.body = JSON.stringify(body);
        break;
      case 'delete':
        options.method = 'DELETE';
    }
  }
   return await fetch(apiUrl, options)
      .then((res) => res.json())
      .then((d) => {
        // console.log('results: ', d.results)
        if (d.results) {
          // console.log(convertAllDates(d.results));
          setData(convertAllDates(d.results));
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(rolesUrl, options)
    .then((res)=> res.json())
    .then((d) => {
      if (d.results) {
        setRoleData(convertAllDates(d.results));
      }
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, [])
  

  // const fetchAll = async (apiUrls, apiOptions) => {
  //   return await Promise.all(apiUrls.map((url) => fetch(url, apiOptions)))
  //     .then((responses) =>
  //       responses.map((res) => {
  //         res.json();
  //       })
  //     )
  //     .then((data) => console.log('data: ', data))
  //     .catch((err) => {
  //       console.log(err);
  //       setError(err);
  //     })
  //     .finally(() => setLoading(false));
  // };

  useEffect(() => {
    setLoading(true);
    // console.log('in custom hook useEffect')
    if (url) {
      fetchOne(url);
    }
  }, []);

  return { fetchOne, data, loading, error, roleData };
};

export default useApi;
