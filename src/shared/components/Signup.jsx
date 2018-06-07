import React from 'react';
import { Grid, Row, Col, Panel, Form, FormControl, FormGroup, InputGroup, Glyphicon, ControlLabel, Button, HelpBlock, DropdownButton, MenuItem} from 'react-bootstrap';

import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
    buttonstyle : {'textAlign' : 'center'},
    center : {'textAlign' : 'center'},
    error : {'textAlign' : 'center', 'color':'red'},
    para : {'textAlign' : 'center', 'color':'grey'},
    helpblock : {'textAlign' : 'center', 'color' : 'blue'},
    panel : { textAlign :'center'},
    panelfooter : {'textAlign' : 'center', 'color' : 'grey', margin : '0px', padding: '0px'},    
    link : {textDecoration : 'underline', fontWeight : 'bold', 'cursor' : 'pointer'}
};

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
                        username : "",
                        email : "",
                        password : "",
                        repassword : "",
                        isformvalid : {
                                        status : false,
                                        valid_username : true,
                                        valid_email : true,
                                        valid_password : true,
                                        valid_repassword : true
                                    },
                        unique_email : true,
                        password_matched : true,
                        name_allchars : true,
                        password_pat : true,
                        submitted : false,
                        failedsave : false,
                        isformtouched : {
                                            status : false,
                                            username : false,
                                            email : false,
                                            password : false,
                                            repassword : false
                                        },
                        search : "",
                        technologies : [],
                        alltechnologies : []                                                        
                    };

        this.handleInptChange = this.handleInptChange.bind(this);
        this.handleInptBlur = this.handleInptBlur.bind(this);
        this.SignupHandler = this.SignupHandler.bind(this);
        this._onChange = this._onChange.bind(this);
        this.fnGetDataFromStore = this.fnGetDataFromStore.bind(this);
        this.fnremoveitem = this.fnremoveitem.bind(this);
        this.handleselect = this.handleselect.bind(this);        
    }

    // Function to get the data from the store
    fnGetDataFromStore(){
        if(this.state.submitted){
            if(AppStore.isUserSaved()){
                log("User saved to DB Successfully", DEBUG);
                log("Navigating to Login Page");

                // Navigate to login page programmatically
                this.props.history.push('/login');
            }else{
                log("Unable to Save to DB... Please try again", INFO);
                this.state.submitted = false;
                this.setState({submitted : this.state.submitted});

                this.state.failedsave = true;
                this.setState({failedsave : this.state.failedsave});
            }
        }

        this.state.unique_email = AppStore.isUniqEmail();
        this.setState({unique_email : this.state.unique_email});        
    }    

	// Function to handle the change event from the store
	_onChange(){
        log("Signup Component received change event from App store", INFO);
        this.fnGetDataFromStore();              
    }
        
	// Register with App store on component mount
	componentDidMount(){
        AppStore.addChangeListener(this._onChange);	

        // Get the initial data from the AppStore
        var technologies = [];
        var alltechnologies = [];
        var alltechnologiesobj = AppStore._getTechnologies();
        alltechnologiesobj.map( obj => {
            alltechnologies.push(obj.name);
        });        
        //alltechnologies = alltechnologiesobj.list;
        //var alltechnologies = ["C", "C++", "Java", "Java Script", "MongoDB", "React JS", "Angular JS", "node JS", "React Native", "Spring", "Hadoop"];

        this.state.alltechnologies = alltechnologies;
        this.setState(this.state);
	}

	//De-Register with App store on component unmount
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange);
    }
        
	// Function to handle the input changes
	handleInptChange(event) {
        this.setState({[event.target.name]: event.target.value});
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
        this.state.search = "";
        this.setState(this.state);
    }        
    
	// Function to handle the input onBlur()
	handleInptBlur(event) {
        switch(event.target.name){
            case 'username' :
                this.state.isformtouched.username = true;
                // Check if username is greater than zero chars
                if(this.state.username == ""){
                    this.state.isformvalid.valid_username = false;
                    this.state.isformvalid.status = false;
                }else{
                    this.state.isformvalid.valid_username = true;
                }

                // Username should have only characters
                if(/^[a-zA-Z]+$/.test(this.state.username)){
                    this.state.name_allchars = true;
                }else{
                    this.state.name_allchars = false;
                }              
                break;

            case 'email' :
                this.state.isformtouched.email = true;
                // Check if email is no null
                if(this.state.email == ""){
                    this.state.isformvalid.valid_email = false;
                    this.state.isformvalid.status = false;
                }else{
                    this.state.isformvalid.valid_email = true;

                    // Call the Action function to check if the email is available or taken
                    Actions.ChkEmail({email : this.state.email});
                }
                break;                

            case 'password' :
                this.state.isformtouched.password = true;
                // Check if the password is not null
                if(this.state.password == ""){
                    this.state.isformvalid.valid_password = false; 
                    this.state.isformvalid.status = false;
                }else{
                    this.state.isformvalid.valid_password = true;
                }
                
                // Check if password and confirm password matches or not
                if(this.state.password != "" && this.state.repassword != "" && this.state.password != this.state.repassword){
                    this.state.password_matched = false;
                }else{
                    this.state.password_matched = true;
                }             
                
                // Check if the password matches the pattern.. 
                // atleast one lower case char, one upper case char, one spl char and one number
                if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(this.state.password)){
                    this.state.password_pat = true;
                }else{
                    this.state.password_pat = false;
                }
                break;            

            case 'repassword' :
                this.state.isformtouched.repassword = true;
                // Check if confirm password is not null
                if(this.state.repassword == ""){
                    this.state.isformvalid.valid_repassword = false; 
                    this.state.isformvalid.status = false;
                }else{
                    this.state.isformvalid.valid_repassword = true;
                }

                // Check if password and confirm password matches
                if(this.state.password != this.state.repassword){
                    this.state.password_matched = false;
                }else{
                    this.state.password_matched = true;
                }
                break;                            
        }

        if(this.state.isformtouched.username && this.state.isformtouched.email && 
            this.state.isformtouched.password && this.state.isformtouched.repassword){
                this.state.isformtouched.status = true;
            }

        // Save the State
        this.setState(this.state);  
        
        if(this.state.isformvalid.valid_email && this.state.isformvalid.valid_password && 
            this.state.isformvalid.valid_repassword && this.state.isformvalid.valid_username)
             {
                 log("Setting form status to valid", DEBUG);
                 this.state.isformvalid.status = true;
             }
        // Save the State
        this.setState(this.state);  
    }    
    
    // Function to handler Signup action
    SignupHandler()
    {
        // Initiate Action only if all the form validations are successful
        if(this.state.unique_email && this.state.password_matched && this.state.name_allchars && this.state.password_pat){
            // Create a new user object to send to the service
            var signup_obj = {
                                "username" : this.state.username,
                                "email" : this.state.email,
                                "password" : this.state.password,
                                "technologies" : this.state.technologies
                            };

            // set the state to submitted before firing the action object
            this.state.submitted = true;
            this.setState({submitted : this.state.submitted });

            // Call the Signup Action
            Actions.Signup(signup_obj);
        }
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
            <div id="div_signup">
            <br/>
                <Grid>
                    <Row>
                        <Col sm={6} smOffset={3}>
                            <Panel bsStyle="primary" style={styleobj.panel}>
                                <Panel.Heading>
                                    <Panel.Title>
                                        Signup
                                    </Panel.Title>
                                </Panel.Heading>                                
                                <Panel.Body>
                                    <Form horizontal>
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4} htmlFor="username">
                                                {"Username"}
                                            </Col>
                                            <Col sm={8}>
                                                <FormControl type="text" required id="username" name="username"
                                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur}
                                                    value={this.state.username || ""}>
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        { !this.state.isformvalid.valid_username                                        
                                            ? <p style={styleobj.para}>Username is mandatory field !!</p>
                                            :                                    
                                                 !this.state.name_allchars
                                                    ? <p style={styleobj.para}>Name Contains invalid characters !!</p>
                                                    : <span></span>
                                        }
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4} htmlFor="email">
                                                {"Email Address"}
                                            </Col>
                                            <Col sm={8}>
                                                <FormControl type="text" required id="email" name="email"
                                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur}
                                                    value={this.state.email || ""}>
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        { !this.state.isformvalid.valid_email
                                            ? <p style={styleobj.para}>Email is mandatory field!!</p>
                                            :                                    
                                                !this.state.unique_email 
                                                    ? <p style={styleobj.para}>Email is already registered. Please enter different.</p>
                                                    : <span></span>
                                        }
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4} htmlFor="password">
                                                {"Password"}
                                            </Col>
                                            <Col sm={8}>
                                                <FormControl type="password" required id="password" name="password"
                                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur} 
                                                    value={this.state.password || ""}>
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        { !this.state.isformvalid.valid_password
                                            ? <p style={styleobj.para}>Password is mandatory field !!</p>
                                            : 
                                                 !this.state.password_pat
                                                    ? <p style={styleobj.para}>should contain at least 1 uppercase char, 1 lowercase character, 1 number and 1 spl char !!</p>
                                                    : <span></span>
                                        }                                        
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4} htmlFor="repassword">
                                                {"Confirm Password"}
                                            </Col>
                                            <Col sm={8}>
                                                <FormControl type="password" required id="repassword" name="repassword"
                                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur} 
                                                    value={this.state.repassword || ""}>
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                        { !this.state.password_matched
                                            ? <p style={styleobj.para}>Password and Confirm Password are not matching !!</p>
                                            : <span></span>
                                        }
                                        <FormGroup>
                                            <Col componentClass={ControlLabel} sm={4} smOffset={4} style={styleobj.center}>
                                                <Button bsStyle="primary" onClick={this.SignupHandler}
                                                    disabled={!(this.state.isformtouched.status && this.state.isformvalid.status)}> 
                                                    {"Register"}
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <p style={styleobj.panelfooter}>
                                        Go back to &nbsp;
                                        <em style={styleobj.link}
                                            onClick={()=>{this.props.history.push('/login')}}>
                                            Login
                                        </em>
                                    </p>                                    
                                </Panel.Body>
                            </Panel>

                            { this.state.failedsave
                                ?  <p style={styleobj.error}> 
                                        !! &nbsp; Failed to save the data.. Please Try Again !!
                                    </p> 
                                :	<span></span>
                            }
                            <HelpBlock style={styleobj.helpblock}>
                                Click Here to go back to &nbsp;
                                <em style={styleobj.link}
                                    onClick={()=>{this.props.history.push('/')}}>
                                    Home Page
                                </em>
                            </HelpBlock>                            
                        </Col>
                    </Row>
                </Grid>
                {
                    this.state.isformtouched.status && this.state.isformvalid.status
                        ? 
                            <div id="id_technologies">
                                <h3 style={styleobj.h3blue}>            
                                    &nbsp; <Glyphicon glyph="flash" style={styleobj.style_navglyph}/>
                                    &nbsp; {"Choose your areas of interest : "} &nbsp;                
                                </h3>
                                <div style={{textAlign : 'left', margin : '30px', padding : '5px 2px', border : '1px lightgrey solid'}}>
                                    <form className="form-inline">
                                        <FormGroup>
                                            {technologysection}
                                        </FormGroup>
                                    </form>
                                </div>
                            </div>                        
                        : <span></span>
                }
            </div>
        );
    }
}

export default Signup;