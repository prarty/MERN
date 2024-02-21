import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignOut from "./pages/SignOut.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";

export default function App() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/sign-in"} element={<SignIn/>}/>
            <Route path={"/sign-out"} element={<SignOut/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/about"} element={<About/>}/>
        </Routes>
    </BrowserRouter>
}
