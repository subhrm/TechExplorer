import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import sharedRoutes from "../shared/routes";
import Header from '../shared/components/Header.jsx';
import Footer from '../shared/components/Footer.jsx';

class Routes extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
                <Router>
                    <div id="div_routes">
                        <Header />                    
                            {sharedRoutes.map( (route, index) => (
                                <Route key={index} {...route} />
                            ))}
                        <Footer />
                    </div>
                </Router>    
        );
    }
}

export default Routes;