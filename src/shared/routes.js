import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Logout from './components/Logout.jsx';
import WatchList from './components/WatchList.jsx';
import Profile from './components/Profile.jsx';
import BrowseEvents from './components/BrowseEvents.jsx';
import SearchResults from './components/SearchResults.jsx';
import EventDetails from './components/EventDetails.jsx';

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
    },

    {
        path : '/watchlist',
        component : WatchList
    },

    {
        path : '/profile',
        component : Profile
    },

    {
        path : '/browseevents',
        component : BrowseEvents
    },
    
    {
        path : '/search/:pattern',
        component : SearchResults
    },

    {
        path : '/eventdetails/:eventobj',
        component : EventDetails
    }
];

export default Routes;