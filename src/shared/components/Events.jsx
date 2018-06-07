import React from 'react';
import { Panel, Grid, Row, Col, Glyphicon, Image, Button } from 'react-bootstrap';

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
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',             
        height: '200px',
        padding : '2px'
        },

    style_header : {
        margin : '15px 15px 0px 15px',
        padding: '5px'
    },        
    style_col : {
        padding: '15px'
    },

    border : {
        border: '1px solid black',
        borderRadius: '10px',
        height: '380px'
    },

    style_glyph : {
        padding: '5px'
    }
};

class Events extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                        watchlisted : false
                    };

        this.AddtoWatchList = this.AddtoWatchList.bind(this);
    }

    // Function to add to watchlist
    AddtoWatchList(){
        var event_id = { event_id : this.props.eid};

        if(this.state.watchlisted){
            this.state.watchlisted = false;
            this.setState(this.state);
            Actions.RemoveFromWatchList(event_id);
        }else{
            this.state.watchlisted = true;
            this.setState(this.state);            
            Actions.AddtoWatchList(event_id);
        }
        
    }

    render(){
        // <p>&nbsp;{this.props.edesc}</p>

        //var datestr = this.props.
        // <a href={} target="_blank">UTC</a>

        var self = this;

        return(<div id='div_events' style={styleobj.border}>
                    <div style={styleobj.style_border}>
                        <Image src={this.props.eimgsrc} rounded style={{width : '100%', height :'100%'}}/>
                    </div>

                    <div style={styleobj.style_header}>
                        <a href={this.props.eurl} target="_blank">
                            {this.props.ename}
                        </a>
                    </div>

                    <div style={styleobj.style_col}>
                        <p>
                            <Glyphicon glyph="calendar" style={styleobj.style_glyph}/>
                            {this.props.edate} UTC                            
                        </p>
                        <p>
                            <Glyphicon glyph="map-marker" style={styleobj.style_glyph}/>
                            {this.props.eloc}
                        </p>

                        { this.props.ebtn 
                            ?
                                this.state.watchlisted 
                                ?
                                    <div style={{textAlign:'right'}}>
                                        <Button bsStyle="danger" bsSize="small"
                                            onClick={()=>{self.AddtoWatchList()}}>
                                            Remove from WatchList
                                        </Button>
                                    </div>
                                :
                                    <div style={{textAlign:'right'}}>
                                        <Button bsStyle="success" bsSize="small"
                                            onClick={()=>{self.AddtoWatchList()}}>
                                            Add to WatchList
                                        </Button>
                                    </div>
                            :   <span></span>
                        }
                    </div>
                </div>
        );
    }
}

export default Events;
