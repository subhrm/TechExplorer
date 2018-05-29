import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="div_home">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"Home"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"Home Component for the Application."}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default Home;