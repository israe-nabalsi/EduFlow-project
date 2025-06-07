// src/router/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Courses from '../pages/Courses';
import Tasks from '../pages/Tasks';
import Grades from '../pages/Grades';
import Exams from '../pages/Exams';
import Students from '../pages/Students';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Layout from '../Layouts/Layout';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/register',
    element: <Register />, 
  },
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Home />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/grades',
        element: <Grades />,
      },
      {
        path: '/exams',
        element: <Exams />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ]
  }
]);
