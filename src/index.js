import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import SignUpForm from './SignUpForm';
// import LoginForm from './LoginForm';
import App from './App';

// router testing
import { BrowserRouter, } from 'react-router-dom';
// import Expenses from './components/Expenses';
// import Invoices from './components/Invoices';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </>
);
