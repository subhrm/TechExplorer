import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class EventDetails extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        var eventobj = this.props.match.params.eventobj;
        return(
            <div id="div_EventDetails">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"EventDetails"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"EventDetails Component for the Application."}
                            <br/>
                            {"User is looking for the details of the event [" + eventobj.ename + "]"}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default EventDetails;