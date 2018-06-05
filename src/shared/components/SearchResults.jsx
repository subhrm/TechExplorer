import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

class SearchResults extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        var pattern = this.props.match.params.pattern;
        return(
            <div id="div_SearchResults">
        <Grid>
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>{"SearchResults"}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {"SearchResults Component for the Application."}
                            <br/>
                            {"User is searching for [" + pattern + "]"}
                        </Panel.Body>
                    </Panel>                
                </Col>
            </Row>
        </Grid>
            </div>
        );
    }
}

export default SearchResults;