import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/home/Home";
import UserCreate from "./screens/user-create/UserCreate";
import UserJoin from "./screens/user-join/UserJoin";
import Play from "./screens/play/Play";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Router = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createRoom" element={<UserCreate />} />
                <Route path="/joinRoom" element={<UserJoin />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
