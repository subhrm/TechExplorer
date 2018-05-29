import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class Logout extends React.Component{

    constructor(props){
        super(props);
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
                            {"Logout Component for the Application."}
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