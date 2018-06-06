import React from 'react';
import { Panel, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import ListEvents from './ListEvents.jsx';


var event_watchlist = [
    {
        name: "WatchListEvent1",
        desc: "Good Event for Tech",
        category: "Webex",
        subcategory: "IOT",
        date: "01/06/2018",
        location: 'Hyderabad'
    },
    {
        name: "WatchListEvent2",
        desc: "Good Event for Tech",
        category: "Seminars",
        subcategory: "AI/ML",
        date: "05/06/2018",
        location: 'Hyderabad'
    },
    {
        name: "WatchListEvent3",
        desc: "Good Event for Tech",
        category: "Webex",
        subcategory: "Blockchain",
        date: "01/07/2018",
        location: 'Bangalore'
    },
    {
        name: "WatchListEvent4",
        desc: "Good Event for Tech",
        category: "Workshops",
        subcategory: "Cloud",
        date: "01/08/2018",
        location: 'Pune'
    },
    
]
class WatchList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                        watchlist_events : [],
                        };
        this._onChange = this._onChange.bind(this);
    }

    // Register with App store on component mount
    componentDidMount() {
        // AppStore.addChangeListener(this._onChange);

    }

    //De-Register with App store on component unmount
	componentWillUnmount(){
		// AppStore.removeChangeListener(this._onChange);
    }

    // Function to handle the change event from the store
	_onChange(){
		log("Home Component received change event from App store", DEBUG);

        this.state.watchlist_events = AppStore._getEvents();
        this.setState(this.state);
	}

    render(){
        var events = this.state.watchlist_events;

        return(
            <div id="div_WatchList">
        <Grid>
            <Row>
            
            <ListGroup>
                {event_watchlist.map(function(ev,index){
                    return(
                        <ListGroupItem key={'watcheventKey' + index}>
                            <ListEvents ename={ev.name}
                            edesc={ev.desc}
                            edate={ev.date}
                            eloc={ev.location} />
                        </ListGroupItem>
                    )
                })}                
            </ListGroup> 
            </Row>
        </Grid>
            </div>
        );
    }
}

export default WatchList;