import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class Profile extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_Profile">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"Profile"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"Profile Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default Profile;