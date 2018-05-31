import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class WatchList extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_WatchList">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"WatchList"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"WatchList Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default WatchList;