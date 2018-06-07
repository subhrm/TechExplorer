import React from 'react';
import { Image, Panel, Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';

import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
    style_border : {
        border: '1px solid black',
        borderRadius: '10px',             
        height: '200px',
        },

    style_col : {
        padding: '15px'
    },
    style_header : {
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

        this.RemoveFromWatchList = this.RemoveFromWatchList.bind(this);
    }

    RemoveFromWatchList(){
        var event_id = { event_id : this.props.eid};
        Actions.RemoveFromWatchList(event_id);        
    }

    render(){
        var self = this;
        return(<div id='div_watchlistevents'>
                    <Grid>
                        <Row>
                            <Col sm={4} >
                                <div style={styleobj.style_border}>
                                    <Image rounded src={this.props.eimgsrc} style={{width : '100%', height :'100%'}}/>
                                </div>
                            </Col>
                            <Col sm={5} smOffset={1}>
                                <div style={styleobj.style_header}> 
                                    <br/>
                                    <strong>{this.props.ename}</strong>
                                </div>

                                <div style={styleobj.style_col}>
                                    <p>{this.props.edesc}</p>
                                    <p>
                                        <Glyphicon glyph="calendar" style={styleobj.style_glyph}/>
                                        {this.props.edate} UTC
                                    </p>
                                    <p>
                                        <Glyphicon glyph="map-marker" style={styleobj.style_glyph}/>
                                        {this.props.eloc}
                                    </p>

                                    <Button bsStyle="danger" bsSize="small"
                                        onClick={()=> self.RemoveFromWatchList()}>
                                        Remove from watch list
                                    </Button>                                    
                                </div>
                            </Col>
                        </Row>
                    </Grid>
            </div>
        );
    }
}

export default ListEvents;
