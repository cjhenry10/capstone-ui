import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import UserHome from "./components/UserHome";

export default function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUpForm />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/user_home" element={<UserHome />}></Route>
            </Routes>
        </div>
    );
}