import React from 'react';
import { Panel, Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Select from 'react-select';

import Events from './Events.jsx';

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

var category_list = [
    'All','Webex', 'Seminars', 'Meetings', 'Workshops'
]

var tech_list = [
    'All','IOT', 'Blockchain', 'Cloud', 'AI/ML'
]



const styleobj = {
    style_event : {
             padding: '10px'
        },

    nav_style : {
        backgroundColor : '#f2f2f2',
        padding: '10px'
    }
};

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state =    {
                            value: 'All',
                            category: 'All',
                            technology: 'All',
                            event_locations: [],
                            event_categories: [],
                        };
        this.loadLocations = this.loadLocations.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.loadLocations();
        // load categories
        // load technologies
    }

    loadLocations() {
        var temp_arr = [];
        event_list.map(function(event) {
            temp_arr.push(event.location)
        });
        var temp_location = new Set(temp_arr);
        temp_arr = ['All',...temp_location];
        console.log(temp_arr);
        this.setState({event_locations: temp_arr})
    }

    

    onChange(e) {
        this.setState({
          value: e.target.value
        })
      }

    onTechChange(e) {
    this.setState({
        technology: e.target.value
    })
    }

    handleClick(value) {
        this.setState({
            category: value
        })
        console.log(this.state.category)
    }

    render(){
        var location_options = this.state.event_locations
        var loc = this.state.value
        return(
            <div id="div_home">
                <Grid fluid={true}>
                    <Row style={styleobj.nav_style}>
                        <Col xs={4} sm={2}>                        
                            <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control" name="city">
                                {location_options.map(option => {
                                                    return <option value={option} key={option} >{option}</option>
                                })}
                            </select>
                        </Col>
                        <Col sm={6} smOffset={1} mdOffset={2}>
                        
                            <ButtonGroup >
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
                        <Col xs={4} sm={2}>                        
                            <select value={this.state.technology} onChange={this.onTechChange.bind(this)} className="form-control" name="tech">
                                {tech_list.map(option => {
                                                    return <option value={option} key={option} >{option}</option>
                                })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        {event_list.map(function(events,index){
                            if(loc == 'All') {
                                return ( 
                                    <Col sm={6} md={3} key={'eventKey' + index} style={styleobj.style_event}>
                                            <Events ename={events.name}
                                            edesc={events.desc}
                                            edate={events.date} />
                                    </Col>                                
                                    )
                                } 
                            else {
                                if (events.location == loc) {
                                    return ( 
                                        <Col sm={6} md={3} key={'eventKey' + index} style={styleobj.style_event}>
                                                <Events ename={events.name}
                                                edesc={events.desc}
                                                edate={events.date} />
                                        </Col>                                
                                        )
                                    }
                            }
                            
                            })}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Home;