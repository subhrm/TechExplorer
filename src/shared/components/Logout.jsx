import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

class Logout extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        log("User Clicked on Logout", INFO);
        log("Navigating to Home page");
        // Navigate to home page programmatically
        this.props.history.push('/');
        // Call the Logout Action
        Actions.Logout();
    }

    render(){
        return(
            <div id="div_Logout">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"Logout"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"Logout Component for the Application.. Wait!! You are not supposed to see this"}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default Logout;