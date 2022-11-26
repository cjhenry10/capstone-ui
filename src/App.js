import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import Home from './components/LandingPage/Home';
import SignUpForm from './components/User/SignUpForm';
import LoginForm from './components/User/LoginForm';
import TicketList from './components/Tickets/TicketList';
import TicketCreation from "./components/Tickets/TicketCreation";
import SingleTicket from "./components/Tickets/SingleTicket";
import { AuthContextProvider } from './context/auth-context';
import Logout from './components/User/Logout';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Paper } from '@mui/material';
import AllGroups from './components/Groups/AllGroups';
import Role from './components/Roles/Role';
import AccountInfo from './components/User/AccountInfo';
import AllUsers from './components/Users/AllUsers';

export default function App() {
  document.title = "Help Desk Wizard"
  let savedTheme;
  if (localStorage.getItem('theme')) {
    savedTheme = localStorage.getItem('theme');
  } else {
    savedTheme = 'light';
  }

  const [mode, setMode] = useState(savedTheme);

  const handleThemeChange = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'light'
        ? {
            primary: {
              light: '#666ad1',
              // main: '#7682d6',
              main: '#303f9f',
              dark: '#001970',
              contrastText: '#fff',
            },
            secondary: {
              light: '#aab6fe',
              main: '#7986cb',
              dark: '#49599a',
              contrastText: '#fff',
            },
          }
        : {
            primary: {
              light: '#666ad1',
              main: '#7682d6',
              // main: '#303f9f',
              dark: '#3b4bc4',
              contrastText: '#fff',
            },
            secondary: {
              light: '#aab6fe',
              main: '#3b4bc4',
              dark: '#49599a',
              contrastText: '#fff',
            },
          }),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Nav mode={mode} theme={theme} onThemeChange={handleThemeChange} />
        <Paper
          sx={{ pt: '85px', minHeight: 'calc(100vh - 85px)' }}
          square
          elevation={4}
        >
          <Routes>
            <Route path='/' element={<Home theme={theme} />}></Route>
            <Route path='/signup' element={<SignUpForm />}></Route>
            <Route path='/login' element={<LoginForm />}></Route>
            <Route path='/tickets' element={<TicketList />}></Route>
            <Route path='/ticket/:id' element={<SingleTicket />}></Route>
            <Route path='/ticket_creation' element={<TicketCreation />}></Route>
            <Route path='/logout' element={<Logout theme={theme} />}></Route>
            <Route path='/group' element={<AllGroups theme={theme} />}></Route>
            <Route path='/role' element={<Role theme={theme} />}></Route>
            <Route
              path='/account'
              element={<AccountInfo theme={theme} />}
            ></Route>
            <Route path='/users' element={<AllUsers theme={theme} />}></Route>
          </Routes>
        </Paper>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
