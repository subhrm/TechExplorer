import React from 'react';
import ReactBootstrap, { HelpBlock } from 'react-bootstrap';
import { Button, Glyphicon, FormGroup, FormControl, Label, Grid, Row, Col, Panel, Form } from 'react-bootstrap';

import Actions from '../actions/Actions.js';
import AppStore from '../stores/AppStore.js';

var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
					error : {'textAlign' : 'center', 'color':'red'},
					helpblock : {'textAlign' : 'center', 'color' : 'blue'},
					panelfooter : {'textAlign' : 'center', 'color' : 'grey'},
                    panel : { textAlign :'center'},
                    link : {textDecoration : 'underline', fontWeight : 'bold', 'cursor' : 'pointer'}
				};

class Login extends React.Component{
	
	// Constructor
	constructor(props){
		super(props);

		this.state = {
						username : "", 
						password : "", 
						validuser : true, 
						submitted : false,
						formvalid : {
										status : false,
										valid_username : true,
										valid_password : true
									}
					};

        this._onChange = this._onChange.bind(this);
        this.handleInptChange = this.handleInptChange.bind(this);
        this.handleInptBlur = this.handleInptBlur.bind(this);		
		this.LoginHandler = this.LoginHandler.bind(this);
    }
    
	// Register with App store on component mount
	componentDidMount(){
        AppStore.addChangeListener(this._onChange);	        
	}

	//De-Register with App store on component unmount
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange);
	}

	// Function to handle the input changes
	handleInptChange(event) {
		this.setState({[event.target.name]: event.target.value});
    }

	// Function to handle the input onBlur()
	handleInptBlur(event) {
        switch(event.target.name){
            case 'username' :
                if(this.state.username == ""){
                    this.state.formvalid.valid_username = false;
                    this.state.formvalid.status = false;
                }else{
                    this.state.formvalid.valid_username = true;
                    if(this.state.password != ""){
                        this.state.formvalid.status = true;
                    }
                }
                this.setState(this.state);                
                break;

            case 'password' :
                if(this.state.password == ""){
                    this.state.formvalid.valid_password = false; 
                    this.state.formvalid.status = false;
                }else{
                    this.state.formvalid.valid_password = true;
                    if(this.state.username != ""){
                        this.state.formvalid.status = true;
                    }
                }
                this.setState(this.state);
                break;                         
        }
    }        
    
	// Function to handle the change event from the store
	_onChange(){
		log("Login Component received change event from App store", DEBUG);

		this.state.validuser = AppStore.isAuthenticated();
		this.setState(this.state);

		if(this.state.validuser){
            log("Valid User", DEBUG);
            log("Navigating to the user watchlist Page", DEBUG);

            // Navigate to user watchlist page programmatically
            this.props.history.push('/watchlist');			
		}
		else{
			log("Invalid Credentials", DEBUG);
		}
	}    
	
	// Function to handle login action
	LoginHandler(e){		
		//e.preventDefault();
		log("Login Component - LoginHandler fn Start", DEBUG);

		// If form is valid only then call the action handler
		if(this.state.formvalid.status)
		{
			this.state.submitted = true;
			this.setState(this.state);
			var userobj = { "email" : this.state.username, 
							"password" : this.state.password
						};
			log(JSON.stringify(userobj), DEBUG);
			Actions.Login(userobj);
		}
	}
	
	// Render function
	render(){

		return(
<div id="div_login">
	<br/>    
	<Grid>
		<Row>
			<Col sm={4} smOffset={4}>
				<Panel bsStyle="primary" style={styleobj.panel}>
                    <Panel.Heading>
                        <Panel.Title>
                            Login
                        </Panel.Title>
                    </Panel.Heading>
					<Panel.Body>
						<Form>
							<FormGroup>
								<FormControl type="text" placeholder="Email" name="username" required
                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur}
                                    value={this.state.username || ""}/>
							</FormGroup>

                            { !this.state.formvalid.valid_username 
					            ?  <p style={styleobj.error}> Username is mandatory !!</p> 
					            :	<span></span>                            
                            }

							<FormGroup>
								<FormControl type="password" name="password" placeholder="Password" required
                                    onChange={this.handleInptChange} onBlur={this.handleInptBlur}
                                    value={this.state.password || ""} />
							</FormGroup>

                            { !this.state.formvalid.valid_password 
					            ?  <p style={styleobj.error}> Password is mandatory !!</p> 
					            :	<span></span>                            
                            }

                            <Button bsStyle="primary"
                                disabled={!this.state.formvalid.status}
								onClick={this.LoginHandler}>
								{"Sign in"}
							</Button>
						</Form>
						<br/>
						<p style={styleobj.panelfooter}>
							New User? &nbsp;
							<em style={styleobj.link}
								onClick={()=>{this.props.history.push('/signup')}}>
								Signup Here
							</em>
						</p>						
					</Panel.Body>	
				</Panel>

				{ !this.state.validuser && this.state.submitted
					?  <p style={styleobj.error}>Invalid Credentials!! Try Again !!</p> 
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
</div>
		);
	}
}

export default Login;