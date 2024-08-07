import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './users/pages/register';
import Login from './users/pages/login';
import Dashboard from './users/pages/dashboard';
import NewPDF from './pdf/pages/new-pdf';
import PDFChat from './pdf/pages/pdf-chat';
import PDFList from './pdf/pages/pdf-list';
import AppLayout from './layouts/app-layout';
import AccessDenied from './pdf/pages/Access-Denied';
import Profile from './users/pages/profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/new-pdf",
    element: <NewPDF />,
  },
  {
    path: "/pdf/:id",
    element: <PDFChat />,
  },
  {
    path: "/pdfs",
    element: <PDFList />,
  },
  {
    path: "/access-denined",
    element: <AccessDenied />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <AppLayout> 404 NOT FOUND</AppLayout>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
