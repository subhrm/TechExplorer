import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class UserEvents extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_UserEvents">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"UserEvents"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"UserEvents Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default UserEvents;