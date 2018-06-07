import React from 'react';
import { Panel, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import ListEvents from './ListEvents.jsx';
import AppStore from '../stores/AppStore.js';

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

class WatchList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                        watchlist_events : [],
                        };
        this._onChange = this._onChange.bind(this);
    }

    // Retrieve list of events for initial render
    componentWillMount() {
        var userobj = AppStore._getUserObj();
        this.state.watchlist_events = userobj.watchlist;
        this.setState(this.state);
        log(JSON.stringify(this.state.watchlist_events), DEBUG);
    }
    // Register with App store on component mount
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }

    //De-Register with App store on component unmount
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange);
    }

    // Function to handle the change event from the store
	_onChange(){
        log("Watchlist Component received change event from App store", DEBUG);
        var userobj = AppStore._getUserObj();
        if(userobj){
            this.state.watchlist_events = userobj.watchlist;
            this.setState(this.state);
        }
	}

    render(){
        var events = this.state.watchlist_events;
        var self = this;

        return(
            <div id="div_WatchList">
                <Grid>
                    <Row>
                        <Col smOffset={1}>
                            <ListGroup style={{borderRadius: '10px'}}>
                                {events.map(function(ev,index){
                                    return(
                                        <ListGroupItem key={'watcheventKey' + index}>
                                            <span>                    
                                                <ListEvents ename={ev.event_name}
                                                    edesc={ev.description}
                                                    eurl={ev.event_url}
                                                    edate={ev.start_date_time}
                                                    eid={ev.id}
                                                    eimgsrc={ev.image_url}
                                                    eloc={ev.location} />
                                            </span>
                                        </ListGroupItem>
                                    )
                                })}                
                            </ListGroup> 
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default WatchList;