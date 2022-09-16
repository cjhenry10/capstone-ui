import { Routes, Route } from "react-router-dom";
import {useState} from 'react'
import Nav from './components/Nav/Nav';
import Home from './components/LandingPage/Home';
import SignUpForm from './components/User/SignUpForm';
import LoginForm from './components/User/LoginForm';
import UserHome from "./components/Tickets/UserHome";
import { AuthContextProvider } from './context/auth-context';
import Logout from './components/User/Logout';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Paper } from '@mui/material';

export default function App() {
    let savedTheme;
    if (localStorage.getItem('theme')) {
        savedTheme = localStorage.getItem('theme');
    } else {
        savedTheme = 'light'
    }

    const [mode, setMode] = useState(savedTheme);

    const handleThemeChange = () => {
        setMode((prev) => prev === 'light' ? 'dark' : 'light');
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light'){
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                light: '#666ad1',
                main: '#303f9f',
                dark: '#001970',
                contrastText: '#fff',
              },
              secondary : {
                light: '#aab6fe',
                main: '#7986cb',
                dark: '#49599a',
                contrastText: '#000',
              }
        }
    })
    return (
        <ThemeProvider theme={theme}>
        <AuthContextProvider>
            <Nav mode={mode} theme={theme} onThemeChange={handleThemeChange} />
            <Paper sx={{ pt: '85px', minHeight: 'calc(100vh - 85px)'}} square elevation={4}>
            <Routes>
                <Route path="/" element={<Home theme={theme}/>}></Route>
                <Route path="/signup" element={<SignUpForm />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path='/user_home' element={<UserHome />}></Route>
                <Route path='/logout' element={<Logout theme={theme}/>}></Route>
            </Routes>
            </Paper>
        </AuthContextProvider>
        </ThemeProvider>
    );
}