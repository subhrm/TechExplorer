import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_Login">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"Login"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"Login Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default Login;