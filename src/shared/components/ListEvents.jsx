import React from 'react';
import { Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';

const styleobj = {
    style_border : {
        border: '1px solid black',
        borderRadius: '10px',             
        height: '200px',
        },

    style_col : {
        padding: '5px'
    },

    border : {
        border: '1px solid black',
        borderRadius: '10px'
    },

    style_glyph : {
        padding: '5px'
    }
};

class ListEvents extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<div id='div_watchlistevents'>
                    <Grid>
                        <Row>
                            <Col sm={3} >
                                <div style={styleobj.style_border}>
                                    <br/>image
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div style={styleobj.style_col}> 
                                        <br/>
                                            <strong>{this.props.ename}</strong>
                                </div>

                                <div style={styleobj.style_col}>
                                <br/>
                                    <p>{this.props.edesc}</p>
                                    <p>
                                        <Glyphicon glyph="calendar" style={styleobj.style_glyph}/>
                                        {this.props.edate}
                                    </p>
                                    <p>
                                        <Glyphicon glyph="map-marker" style={styleobj.style_glyph}/>
                                        {this.props.eloc}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
            </div>
        );
    }
}

export default ListEvents;
