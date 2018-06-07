import React from 'react';
import { Panel, Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavbarHeader } from 'react-bootstrap';
import Select from 'react-select';

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

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state =    {
                            location: 'All',
                            category: 'All',
                            technology: 'All',
                            category_list:[],
                            technology_list: [],
                            events: [],
                            event_locations: [],
                            event_categories: [],
                        };

        this.loadLocations = this.loadLocations.bind(this);
        this.onLocChange = this.onLocChange.bind(this);
        this.loadtechnologies = this.loadtechnologies.bind(this);
        this.loadcategories = this.loadcategories.bind(this);
        this.onTechChange = this.onTechChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    // Retrieve list of events for initial render
    componentWillMount() {
        this.state.events = AppStore._getAllEvents();
    }
    
    // Register with App store on component mount
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
        
        // load categories & technologies
        this.loadcategories();
        this.loadtechnologies();        

        // Function to locations of events available
        this.loadLocations();        
    }

    //De-Register with App store on component unmount
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange);
    }

    // Function to handle the change event from the store
	_onChange(){
		log("Home Component received change event from App store", DEBUG);

        this.state.events = AppStore._getAllEvents();
        this.setState(this.state);
        //log("Updated this.state.events: " + JSON.stringify(this.state.events['future_events']),DEBUG);
	}     

    loadcategories(){        
        var category_list = [];        
        var category_obj_list = AppStore._getCategories();
        if(category_obj_list){
            category_obj_list.map( category_obj => {category_list.push(category_obj.name)});
        }
        // Hardcoding till API gets functional
        category_list = [ 'All','Webex', 'Seminars', 'Meetings', 'Workshops'  ];

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

    loadtechnologies() {

        var technology_list = [];        
        var technology_list = AppStore._getTechnologies();
     
        // Hardcoging till the API gets functional
        var tech_list = [
            'All',
            'IOT',
            'Blockchain',
            'Cloud',
            'AI/ML',
            'football'
        ]
        var technology_list = [...(tech_list)];
      
        this.setState({technology_list: technology_list});
        //log(JSON.stringify(this.state.technology_list), INFO);
    }

    // Function to set the LOCATION criteria to fetch specified events
    onLocChange(e) {
        this.setState({
          location: e.target.value
        })
        log("AFTER LOCATION CHANGE: " + JSON.stringify(this.state.location), DEBUG);
      }

    // Function to set the TECHNOLOGY criteria to fetch specified events
    onTechChange(e) {
        //var id = e.target.value.slice(0,4);
        //var name = e.target.value.slice(4);
        this.setState({
            technology : e.target.value  
        });
        log(this.state.technology, DEBUG);
        // Actions.FetchEventsByTech(this.state.technology);
    }

    // Function to set the CATEGORY criteria to fetch specified events
    handleClick(value) {
        this.setState({
            category: value
        })
        log(this.state.category, DEBUG);
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

        return(
            <div id="div_home">
<Grid fluid={true}>
    <Row style={styleobj.nav_style}>
        <Col sm={3} md={2} >
            <div style={{ fontSize: '18px', padding: '5px'}}>
                {"Technology"}
            </div>
            <select onChange={this.onTechChange.bind(this)} className="form-control" name="tech">
                    {this.state.technology_list.map((option,index) => {
                            return (<option value={option} key={index + option} >{option}</option>)
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
    <Row style={{padding: '5px'}}>
        {filtered_eventlist.map(function(events,index){
                return(
                    <Col sm={6} md={4} lg={3} key={'eventKey' + index} style={styleobj.style_event}>
                        <span style={{ cursor :'pointer'}}
                              onClick={ ()=> {self.props.history.push('/eventdetails/' + events.id)}}>                    
                            <Events ename={events.event_name}
                                edesc={events.description}
                                edate={events.start_date_time}
                                eloc={events.location} />
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

export default Home;