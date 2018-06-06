import React from 'react';
import { Panel, Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

import Events from './Events.jsx';
import AppStore from '../stores/AppStore.js';

var event_list = [
    {
        name: "Event1",
        desc: "Good Event for Tech",
        category: "Webex",
        subcategory: "IOT",
        date: "01/06/2018",
        location: 'Hyderabad'
    },
    {
        name: "Event2",
        desc: "Good Event for Tech",
        category: "Seminars",
        subcategory: "AI/ML",
        date: "05/06/2018",
        location: 'Hyderabad'
    },
    {
        name: "Event3",
        desc: "Good Event for Tech",
        category: "Webex",
        subcategory: "Blockchain",
        date: "01/07/2018",
        location: 'Bangalore'
    },
    {
        name: "Event4",
        desc: "Good Event for Tech",
        category: "Workshops",
        subcategory: "Cloud",
        date: "01/08/2018",
        location: 'Pune'
    },
    {
        name: "Event5",
        desc: "Good Event for Tech",
        category: "Meetings",
        subcategory: "Cloud",
        date: "01/07/2018",
        location: 'Bangalore'
    },
    {
        name: "Event6",
        desc: "Good Event for Tech",
        category: "Seminars",
        subcategory: "Blockchain",
        date: "01/08/2018",
        location: 'Pune'
    }
]

var tech_list = [
    {id: 9999, name: 'All'},
    {id: 1002, name: 'IOT'},
    {id: 1003, name: 'Blockchain'},
    {id: 1004, name: 'Cloud'},
    {id: 1005, name: 'AI/ML'}
]

var category_list = [
    'All','Webex', 'Seminars', 'Meetings', 'Workshops'
]

class BrowseEvents extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                        allbtnstyle : "default",
                        otherbtnstyle : "primary",
                        toggle : "user",
                        location: 'All',
                        events: [],
                        event_locations: [],
                        category: 'All',
                        technology: [
                                        {
                                            id: 9999,
                                            name: "All"
                                        }
                                    ],
                        technology_list: [],
                        event_categories: [],
                    };

        this.fntoggle = this.fntoggle.bind(this);
        this.loadLocations = this.loadLocations.bind(this);
        this.onLocChange = this.onLocChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this.loadtechnologies = this.loadtechnologies.bind(this);
        this.onTechChange = this.onTechChange.bind(this);
    }

    // Register with App store on component mount
    componentDidMount() {
        // AppStore.addChangeListener(this._onChange);

        // Function to locations of events available
        this.loadLocations();
        this.loadtechnologies();

        // Fetch events by (Interests/Categories)
        // Actions.FetchEventsByTech("enter user interests here");
        // the above action might based on the BE service provided
    }

    //De-Register with App store on component unmount
	componentWillUnmount(){
		// AppStore.removeChangeListener(this._onChange);
    }

    // Function to handle the change event from the store
    _onChange(){
		log("Home Component received change event from App store", DEBUG);

        this.state.events = AppStore._getEvents();
        this.setState(this.state);
    }
    
    //Function to extract list of locations from event list
    loadLocations() {
        var temp_arr = [];
        event_list.map(function(event) {
            temp_arr.push(event.location)
        });
        /* Returning list of events from the Store
                this.state.events.map(function(event) {
                    temp_arr.push(event.location)
                });
        */
        var temp_location = new Set(temp_arr);
        temp_arr = ['All',...temp_location];
        console.log(temp_arr);
        this.setState({event_locations: temp_arr});
    }

    // Function to set the LOCATION criteria to fetch specified events
    onLocChange(e) {
        this.setState({
          location: e.target.value
        })
    }

    loadtechnologies() {
        var tp_arr = [];
        /*
        tech_list.forEach(function(tech) {    
            tp_arr.push(tech.name);
        })*/
        tp_arr = [...(tech_list)];
        console.log(tp_arr);        
        this.setState({technology_list: tp_arr});
        console.log(this.state.technology_list);
    }

    // Function to set the TECHNOLOGY criteria to fetch specified events
    onTechChange(e) {
        var id = e.target.value.slice(0,4);
        var name = e.target.value.slice(4);
        this.setState({
            technology : { 
                            id: id,
                            name: name
                         }  
        });
        console.log(this.state.technology);
        // Actions.FetchEventsByTech(this.state.technology);
    }

    // Function to set the CATEGORY criteria to fetch specified events
    handleClick(value) {
        this.setState({
            category: value
        })
        console.log(this.state.category)
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
        var location_options = this.state.event_locations;
        var location = this.state.location;
        var filtered_events = [];

        if(location == 'All') {
            filtered_events = event_list; //this.state.events;
            console.log(filtered_events);
        } else {
            //filtered_events = this.state.events.filter(ev => ev.location == location);
            filtered_events = event_list.filter(ev => ev.location == location);
            console.log(filtered_events);
        }
        return(
            <div id="div_BrowseEvents">
        <Grid style={{margin : '0px', padding : '0px', width : '100%'}}>
            
            <Row>

                <Col sm={2}  smOffset={8} style={{textAlign :'right', margin : '0px', padding : '0px', width : '100%'}}>
                    <ButtonGroup>
                            <Button bsStyle={this.state.allbtnstyle} bsSize="xs" onClick={ () => self.fntoggle()}>All Events</Button>
                            <Button bsStyle={this.state.otherbtnstyle} bsSize="xs" onClick={ () => self.fntoggle()}>Based on Interests</Button>
                    </ButtonGroup>                
                </Col>

            </Row>

            <Row style={{margin : '0px', padding : '10px', width : '100%', backgroundColor : '#f2f2f2'}}>

                <Col sm={3} md={2}>
                    <div style={{ fontSize: '15px', padding: '5px'}}>{"Location"}</div>

                    <select value={this.state.location} onChange={this.onLocChange.bind(this)} className="form-control" name="city">
                            {location_options.map(option => {
                                                return <option value={option} key={option} >{option}</option>
                            })}
                    </select>
                </Col>

                <Col md={8} sm={6} style={{textAlign: 'center'}}>
                    <ButtonGroup style={{ marginLeft: '5%', textAlign: 'center'}}>
                            <ButtonGroup>
                                {category_list.map((category,index) => {
                                    return (
                                        <Button key={'btn' + index} onClick={() => this.handleClick(category)}
                                        >{category}</Button> 
                                    )
                                })}
                            </ButtonGroup>
                        </ButtonGroup>    
                </Col>

                <Col sm={3} md={2}>
                    <div style={{ fontSize: '18px', padding: '5px'}}>
                    {"Technology"}
                    </div>
                    <select onChange={this.onTechChange.bind(this)} className="form-control" name="tech">
                            {this.state.technology_list.map((option,index) => {
                                    return (<option value={option.id+option.name} key={index + option.name} >{option.name}</option>)
                            })}
                    </select>
                </Col>

            </Row>

        </Grid>
        <br/>
        <Grid>
            <Row>
                {filtered_events.map(function(events,index){
                        return ( 
                            <Col sm={6} md={4} lg={3} key={'eventKey' + index} style={{padding: '10px'}}>
                                    <Events ename={events.name}
                                    edesc={events.desc}
                                    edate={events.date}
                                    eloc={events.location} />
                            </Col>                                
                            )
                        })
                    }
            </Row>
        </Grid>
            </div>
        );
    }
}

export default BrowseEvents;