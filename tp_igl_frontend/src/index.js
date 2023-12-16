import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserPage } from './pages/UserPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { ModeratorPage } from './pages/ModeratorPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "user",
    element: <UserPage/>,
  },
  {
    path: "home",
    element: <HomePage/>,
  },
  {
    path: "auth",
    element: <AuthPage/>,
  },
  {
    path: "admin",
    element: <AdminPage/>,
  },
  {
    path: "moderator",
    element: <ModeratorPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);