import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

export default function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/Sign%20Up" element={<SignUpForm />}></Route>
                <Route path="/Log%20In" element={<LoginForm />}></Route>
            </Routes>
        </div>
    );
}