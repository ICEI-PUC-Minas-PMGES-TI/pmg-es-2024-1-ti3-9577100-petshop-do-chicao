import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./Pages/Login/Login";
import Menu from "./Pages/Menu/Menu";
import CadastroPets from "./Pages/Cadastro pets/Cadastro_pets";
import ClientForm from './componentes/ClientForm';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Login />,
    },
    {
        path: "/clientes",
        element: <ClientForm />,
    },
    {
        path: "/menu",
        element: <Menu />,
    },
    {
        path: "/pets",
        element: <CadastroPets />,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
