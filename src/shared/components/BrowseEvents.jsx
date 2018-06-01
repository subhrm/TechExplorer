import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class BrowseEvents extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_BrowseEvents">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"BrowseEvents"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"BrowseEvents Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default BrowseEvents;