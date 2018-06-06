import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Form, FormControl, FormGroup, InputGroup, ControlLabel, Button, Glyphicon, DropdownButton, MenuItem} from 'react-bootstrap';

import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
    button : {'textAlign' : 'center', 'margin' : '5px'},
    left : {'textAlign' : 'left'},
    h3blue : {'color' : 'darkblue', padding : '5px 25px'},
    topborder : {'margin' : '10px 0px', 'borderTop' : '1px lightgrey solid' },

    center : {'textAlign' : 'center'},
    error : {'textAlign' : 'center', 'color':'red'},
    para : {'textAlign' : 'center', 'color':'grey'},

    helpblock : {'textAlign' : 'center', 'color' : 'blue'},
};

class Profile extends React.Component{

    constructor(props){
        super(props);

        this._onChange = this._onChange.bind(this);
        this.handleInptChange = this.handleInptChange.bind(this);
        this.fnGetDataFromStore = this.fnGetDataFromStore.bind(this);
        this.fnresetform = this.fnresetform.bind(this);
        this.fnSaveChanges = this.fnSaveChanges.bind(this);
        this.fnremoveitem = this.fnremoveitem.bind(this);
        this.handleselect = this.handleselect.bind(this);

        this.state = {
                        username : "",
                        email : "",
                        password : "",
                        search : "",
                        technologies : [],
                        alltechnologies : [] 
                    };
    }

	// Function to handle the change event from the store
	_onChange(){
        log("Profile Component received change event from App store", DEBUG);
        this.fnGetDataFromStore();        
    }

    // Function to get the data from the store
    fnGetDataFromStore(){
        var obj = AppStore._getUserObj();
        log(JSON.stringify(obj), DEBUG);
        if(obj){
            this.state.username = obj.username;
            this.state.email = obj.email;
            this.state.password = obj.password;
            this.state.technologies = obj.technologies;
        }

        var alltechnologies = [];
        //alltechnologies = AppStore._getTechnologies();
        var alltechnologies = ["C", "C++", "Java", "Java Script", "MongoDB", "React JS", "Angular JS", "node JS", "React Native", "Spring", "Hadoop"];
        this.state.alltechnologies = alltechnologies;

        this.setState(this.state);
    }
        
	// Register with App store on component mount
	componentDidMount(){
        AppStore.addChangeListener(this._onChange);	
        this.fnGetDataFromStore();
	}

	//De-Register with App store on component unmount
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange);
    }
        
	// Function to handle the input changes
	handleInptChange(event) {
		this.setState({[event.target.name]: event.target.value});
    }

    // Function to reset the form
    fnresetform(){
        this.fnGetDataFromStore();
    }

    // Function to save the changes
    fnSaveChanges(){
        var userobj = {
                        username : this.state.username,
                        password : this.state.password,
                        email : this.state.email,
                        technologies : this.state.technologies
                    };
        Actions.SaveProfile(userobj);
    }

    // Function to handle removing items from the technology list
    fnremoveitem(item){
        //log(item, DEBUG);
        var oldlist = this.state.technologies;
        var newlist = oldlist.filter(( element )=>{ return( !(element == item))})
        this.state.technologies = newlist;
        this.setState(this.state);
    }

    // Functiont to handle the select event on the drop down
    handleselect(element){
        log(element);
        this.state.technologies.push(element);
        this.setState(this.state);
    }   

    render(){

        var self = this;
        var technologysection = [];

        this.state.technologies.map( element => {
            technologysection.push(
                <span key={element} style={{margin : '1px'}}>
                        <InputGroup style={{width : 'auto'}}>
                            <FormControl type="text" disabled value={element} 
                                style={{cursor : 'text'}}/>
                            <InputGroup.Addon 
                                onClick = {() => self.fnremoveitem(element)}
                                style={{fontWeight : 'bold', cursor :'pointer'}}>
                                X
                            </InputGroup.Addon>
                        </InputGroup>
                </span>
            );
        })

        var selectoptions = [];
        var alltechnologies = this.state.alltechnologies;
        var usertechnologies = this.state.technologies;
        var filteredtechnologies = alltechnologies.filter( (element) => {
            if(usertechnologies.indexOf(element) >= 0){
                return false;
            }else{
                return true;
            }
        });
    
        filteredtechnologies.map( (element) => {
            if(this.state.search == ""){
                selectoptions.push(
                    <MenuItem key={element} onClick={()=>self.handleselect(element)}>
                        {element}
                    </MenuItem>
                );
            }else if(element.match(this.state.search) != null){                
                selectoptions.push(
                    <MenuItem key={element} onClick={()=>self.handleselect(element)}>
                        {element}
                    </MenuItem>
                );
            }
        })
        technologysection.push(
            <span key={"newdropdown"} style={{margin : '1px', width:'auto'}}>
                <DropdownButton 
                    title={<input type='text' name="search" 
                    value = {this.state.search || ""} 
                    onChange={this.handleInptChange}
                    autoFocus style={{margin : '0px'}}/>}
                    id="dropdown">
                    {selectoptions}
                </DropdownButton>
            </span>
        );          

        return(
    <div id="div_profile">
        <div id="div_details">
            <h3 style={styleobj.h3blue}>
                <Glyphicon glyph="user" style={styleobj.style_navglyph}/>
                &nbsp; {"User Details"} &nbsp;
            </h3>
            <br/>        
            <Grid>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4} htmlFor="username" style={styleobj.left}> 
                                    {"Name : "}
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" required id="username" name="username"
                                        onChange={this.handleInptChange} onBlur={this.handleInptBlur}
                                        value={this.state.username || ""}>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4} htmlFor="password" style={styleobj.left}>
                                    {"Password : "}
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="password" required id="password" name="password"
                                        onChange={this.handleInptChange} onBlur={this.handleInptBlur} 
                                        value={this.state.password || ""}>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={4} htmlFor="email" style={styleobj.left}>
                                    {"Email : "}
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" required id="email" name="email" disabled
                                        value={this.state.email || ""}>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        </div>
        <br/>
        <div id="id_technologies">
            <h3 style={styleobj.h3blue}>            
                &nbsp; <Glyphicon glyph="flash" style={styleobj.style_navglyph}/>
                &nbsp; {"Choose your areas of interest : "} &nbsp;                
            </h3>
            <div style={{textAlign : 'left', margin : '20px', padding : '5px 2px', border : '1px lightgrey solid'}}>
                <form className="form-inline">
                    <FormGroup>
                        {technologysection}
                    </FormGroup>
                </form>
            </div>
        </div>  
        <div id="div_buttons" style={{textAlign :'center'}}>
            <Button bsStyle="primary" onClick={this.fnSaveChanges} style={styleobj.button}>
                {"Save Changes"}
            </Button>
            <Button bsStyle="primary" onClick={this.fnresetform} style={styleobj.button}> 
                {"Cancel"}
            </Button>
        </div>
    </div>
        );
    }
}

export default Profile;