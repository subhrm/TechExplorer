import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
                <Router>
                    <div id="div_routes">
                        <Header />       

                        <br/>
                        <Link to="/">&nbsp;&nbsp; Home &nbsp;| </Link>
                        <Link to="/signup">&nbsp; Signup &nbsp;| </Link>
                        <Link to="/login">&nbsp; Login &nbsp;| </Link>
                        <Link to="/logout">&nbsp; Logout &nbsp;| </Link>
                        <br/><br/>

                            {Routes.map( (route, index) => (
                                <Route key={index} {...route} />
                            ))}
                        <Footer />
                    </div>
                </Router>    
        );
    }
}

export default App;

