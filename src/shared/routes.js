import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx';

var Routes = [
    {
        path : '/',
        component : Home,
        exact : true
    },
    
    {
        path : '/login',
        component : Login
    },

    {
        path : '/signup',
        component : Signup
    },

    {
        path : '/logout',
        component : Logout
    }
];

export default Routes;