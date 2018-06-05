import React from 'react';
import { Panel, Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

class BrowseEvents extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                        allbtnstyle : "default",
                        otherbtnstyle : "primary",
                        toggle : "user"
                    };

        this.fntoggle = this.fntoggle.bind(this);
    }

    fntoggle(){
        if(this.state.toggle == "user"){
            this.state.toggle = "all";
            this.state.allbtnstyle ="primary";
            this.state.otherbtnstyle = "default";

            // Unset the Filters HERE
        }else{
            this.state.toggle = "user";
            this.state.allbtnstyle ="default";
            this.state.otherbtnstyle = "primary";

            // Set the Filters HERE based on user's interests
        }
        this.setState(this.state);
    }

    render(){
        var self = this;
        return(
            <div id="div_BrowseEvents">
        <Grid style={{margin : '0px', padding : '0px', width : '100%'}}>
            <Row style={{margin : '0px', padding : '0px 10px', width : '100%'}}>
                <Col sm={2} smOffset={10} style={{textAlign :'right', margin : '0px', padding : '0px', width : '100%'}}>
                <ButtonGroup>
                        <Button bsStyle={this.state.allbtnstyle} bsSize="xs" onClick={ () => self.fntoggle()}>All Events</Button>
                        <Button bsStyle={this.state.otherbtnstyle} bsSize="xs" onClick={ () => self.fntoggle()}>Based on Interests</Button>
                </ButtonGroup>                
                </Col>
            </Row>
        </Grid>
        <br/>
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"BrowseEvents"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"BrowseEvents Component for the Application."}
                            <br/><br/>
                            {"This view would be same as the Home page view.. \
                            Except that the filter criteria would be auto set based on user profile\
                            if the toggle button is clicked towards the option - Based on Interests"}
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