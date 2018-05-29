import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class Signup extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_Signup">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"Signup"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"Signup Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default Signup;