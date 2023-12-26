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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ExampleArticle from './pages/ExampleArticle';
import { FavorisPage } from './pages/FavorisPage';
import { ReadMorePage } from './pages/ReadMorePage';

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
  {
    path: "signin",
    element: <SignIn/>,
  },
  {
    path: "signup",
    element: <SignUp/>,
  },
  {
    path:"exampleArticle",
    element:<ExampleArticle/>

  },
    {path: "favoris",
    element: <FavorisPage/>,
  },
  {
    path: "readMoreeLink",
    element: <ReadMorePage/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);