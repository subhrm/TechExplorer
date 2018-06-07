import React from 'react';
import { Panel, Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

import Events from './Events.jsx';
import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
    style_event : {
             padding: '10px'
        },

    nav_style : {
        backgroundColor : '#f2f2f2',
        padding: '10px'
        },
    
    tech_style : {
        fontSize : '28px'
        }
};

class BrowseEvents extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                        allbtnstyle : "default",
                        otherbtnstyle : "primary",
                        toggle : "user",
                        location: 'All',
                        category: 'All',
                        technology: 'All',
                        preferences: [],
                        events: [],
                        technology_list: [],
                        category_list:[],
                        complete_technology_list : [],
                        event_locations: [],
                        event_categories: [],
                        based_on_interest: false
                    };

        this.fntoggle = this.fntoggle.bind(this);
        this.loadLocations = this.loadLocations.bind(this);
        this.onLocChange = this.onLocChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this.loadtechnologies = this.loadtechnologies.bind(this);
        this.onTechChange = this.onTechChange.bind(this);
    }

    // Retrieve list of events for initial render
    componentWillMount() {
        this.state.events = AppStore._getAllEvents();

        var userobj = AppStore._getUserObj();
        this.setState({
            preferences: userobj.technologies
        })
    }

    // Register with App store on component mount
    componentDidMount() {
        //AppStore.addChangeListener(this._onChange);

        // load categories & technologies
        this.loadcategories();
        this.loadtechnologies();        

        // Function to locations of events available
        this.loadLocations(); 

    }

    //De-Register with App store on component unmount
	componentWillUnmount(){
		//AppStore.removeChangeListener(this._onChange);
    }

    // Function to handle the change event from the store
    _onChange(){
		log("Home Component received change event from App store", DEBUG);

        this.state.events = AppStore._getEvents();
        this.setState(this.state);
        //log("Updated this.state.events: " + JSON.stringify(this.state.events['future_events']),DEBUG);
    }
    
    loadcategories(){        
        var category_list = [];        
        var category_obj_list = AppStore._getCategories();
        if(category_obj_list){
            category_obj_list.map( category_obj => {category_list.push(category_obj.name)});
        }

        this.state.category_list = category_list;
        this.setState(this.state);
    }

    //Function to extract list of locations from event list
    loadLocations() {
        var temp_arr = [];
        // Returning list of events from the Store
        var all_events = this.state.events['future_events'];
                all_events.map(function(event) {
                    temp_arr.push(event.location)
                });
        
        var temp_location = new Set(temp_arr);
        temp_arr = ['All',...temp_location];
        //log("Locations of all events: " + JSON.stringify(temp_arr), DEBUG);
        this.setState({event_locations: temp_arr});
    }

    // Function to set the LOCATION criteria to fetch specified events
    onLocChange(e) {
        this.setState({
          location: e.target.value
        })
    }

    loadtechnologies() {
        var technology_list = [];        
        var technology_list = AppStore._getTechnologies();
        this.state.technology_list = technology_list;
        //console.log(this.state.technology_list);
    }

    // Function to set the TECHNOLOGY criteria to fetch specified events
    onTechChange(e) {
        this.setState({
            technology : e.target.value  
        });
        //console.log(this.state.technology);
    }

    // Function to set the CATEGORY criteria to fetch specified events
    handleClick(value) {
        this.setState({
            category: value
        })
        //console.log(this.state.category);
    }

    fntoggle(){
        if(this.state.toggle == "user"){
            this.state.toggle = "all";
            this.state.allbtnstyle ="primary";
            this.state.otherbtnstyle = "default";

            // Unset the Filters HERE
            //this.state.technology_list = this.state.complete_technology_list;
            this.based_on_interest = false;
            //log("TEchnology_list: " + JSON.stringify(this.state.technology_list), DEBUG);

        }else{
            this.state.toggle = "user";
            this.state.allbtnstyle ="default";
            this.state.otherbtnstyle = "primary";

            // Set the Filters HERE based on user's interests
            this.state.technology_list = this.state.preferences;
            this.based_on_interest = true;
            //log("TEchnology_list: " + JSON.stringify(this.state.technology_list), DEBUG);

        }
        this.setState(this.state);
    }

    render(){
        var self = this;
        var location_options = this.state.event_locations;
        var location = this.state.location;
        var tech = this.state.technology;
        //log("Tech value: " + JSON.stringify(this.state.technology), DEBUG);
        var cat = this.state.category;
        var all_events = this.state.events;
        var location_filtered_events = [];
        var category_filtered_events = [];
        var filtered_eventlist = [];

        //Filtering by location
        if(location == 'All') {
            location_filtered_events = all_events.future_events; //this.state.events;
            //log("Filtered events by location, option = All: " + JSON.stringify(location_filtered_events),DEBUG);
        } else {
            location_filtered_events = all_events.future_events.filter(ev => ev.location == location);
            //log("Filtered events by location, option = " + location + " : " + JSON.stringify(location_filtered_events),DEBUG);
        }

        
        //Filtering by Category
        if(cat == 'All') {
            category_filtered_events = location_filtered_events; //this.state.category;
            //log("Filtered events by location & category, option = All: " + JSON.stringify(category_filtered_events),DEBUG);
        } else {
            category_filtered_events = location_filtered_events.filter(ev => ev.category == cat);
            //log("Filtered events by location & category, option = " + location + " : " + JSON.stringify(category_filtered_events),DEBUG);
        }
        

        //Filtering events by technology
        if(tech == 'All') {
            filtered_eventlist = category_filtered_events; //this.state.technology;
            //log("Filtered events, option = All: " + JSON.stringify(filtered_eventlist),DEBUG);
        } else {
            filtered_eventlist = category_filtered_events.filter(ev => ev.technology == tech);
            //log("Filtered events, option = " + location + " : " + JSON.stringify(filtered_eventlist),DEBUG);
        }

        //Filtering based on interest
        if(this.state.based_on_interest == true) {
            filtered_eventlist.filter(ev => {
                                                this.state.technology.forEach(element => ev.technology == element);
                                            }
                                        );  
            //log("Filtered events, option = : " + JSON.stringify(filtered_eventlist),DEBUG);
        } else {
            filtered_eventlist = filtered_eventlist;
            //log("Filtered events, option = : " + JSON.stringify(filtered_eventlist),DEBUG);
        }

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
        <Grid fluid={true}>
            <Row style={styleobj.nav_style}>
                <Col sm={3} md={2} >
                    <div style={{ fontSize: '18px', padding: '5px'}}>
                        {"Technology"}
                    </div>
                    <select onChange={this.onTechChange.bind(this)} className="form-control" name="tech">
                            {this.state.technology_list.map((option,index) => {
                                    return (<option value={option.name} key={index} >{option.name}</option>)
                            })}
                    </select>            
                </Col>
                <Col md={8} sm={6} style={{textAlign: 'center'}}>               
                    <ButtonGroup style={{ marginLeft: '5%', textAlign: 'center'}}>
                        <ButtonGroup>
                            {this.state.category_list.map((category,index) => {
                                return (
                                    <Button key={'btn' + index} onClick={() => this.handleClick(category)}
                                    >{category}</Button> 
                                )
                            })}
                        </ButtonGroup>
                    </ButtonGroup>
                </Col>

                <Col sm={3} md={2}>
                    <div style={{ fontSize: '18px', padding: '5px', textAlign: 'right'}}>
                        {"Location"}
                    </div>
                    <select value={this.state.location} onChange={this.onLocChange.bind(this)} className="form-control" name="city">
                            {location_options.map(option => {
                                                return <option value={option} key={option} >{option}</option>
                            })}
                    </select>
                </Col>
            </Row>
        </Grid>
        <br/>
        <Grid fluid>
            <Row>
                {filtered_eventlist.map(function(events,index){
                        return(
                            <Col sm={6} md={4} lg={3} key={'eventKey' + index} style={styleobj.style_event}>
                                <span>
                                    <Events ename={events.event_name}
                                        edesc={events.description}
                                        eurl={events.event_url}
                                        edate={events.start_date_time}
                                        eimgsrc={events.image_url}
                                        eloc={events.location}
                                        eid={events.id}
                                        ebtn={true} />
                                </span>
                            </Col>                                
                        )
                    }
                )}
            </Row>
        </Grid>
            </div>
        );
    }
}

export default BrowseEvents;