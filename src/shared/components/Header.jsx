import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { DropdownButton, MenuItem, Image, Button, Grid, Row, Col, NavItem, Nav, Glyphicon, Form, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
	headerline : {
		width : '100%',
		borderBottom : '1px solid lightgrey',
		boxShadow : '1px 1px lightgrey',
	},
	title : {
		verticalAlign : 'middle',
		fontWeight : 'bold',
		padding : '0px 10px',
		display : 'inline-block',
		cursor : 'pointer'
	},

	img : {
		verticalAlign : 'middle',
		padding : '5px 5px',
		margin : '0px 10px',
		height : '40px',
		widtht : 'auto'
	},

	login : {
		textAlign : 'right',
		verticalAlign : 'middle',
		margin : '20px 20px',
	},
	logout : {
		textAlign : 'right',
		verticalAlign : 'middle',
		margin : '20px 20px',
	},

	style_navglyph : {'margin' : '3px'},

	style_glyph_logout : {
							fontSize : '175%', 
							marginRight : '5px', 
						},
	style_glyph_logout1 : {
							margin : '5px', 
							padding : '5px',
							fontSize : '175%', 
							border : '1px solid black',
							borderRadius : '5px'
						},						

	subheader : {
					border : '1px solid lightgrey',
					boxShadow : '1px 1px lightgrey',
					margin : '0px'
				},

	searchbar : {
		textAlign : 'center',
		verticalAlign : 'middle',
		margin : '20px 20px',		
	},
	drpdwntitle : {
		fontWeight : 'bold',
		fontSize : '105%'
	}
};

class Header extends React.Component{

	constructor(props){
		super(props);

		this.state = {
						validUser : false,
						activeKey : 0,
						searchinput : "",
						username : ""
					};
		this._onChange = this._onChange.bind(this);
		this.fnGetDataFromStore = this.fnGetDataFromStore.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.fnClickSearch = this.fnClickSearch.bind(this);
        this.handleInptChange = this.handleInptChange.bind(this);		

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
	
	// Function to handle the change event from the store
	_onChange(){
        log("Profile Component received change event from App store", DEBUG);
        this.fnGetDataFromStore();    
	}	
	
	// Function to get the data from the store
	fnGetDataFromStore(){
		this.state.validUser = AppStore.isAuthenticated();
		this.state.username = AppStore._getUser();
		this.setState(this.state);
	}

	// Function to handle the Nav Selection
	handleSelect(selectedKey) {
		this.state.activeKey = selectedKey;
		this.setState(this.state);
	}

    fnClickSearch(){
        log("Clicked on Search box : " + JSON.stringify(this.state.searchinput ), DEBUG);
    }

	// Function to handle the input changes on the search form control
	handleInptChange(event) {
        this.setState({[event.target.name]: event.target.value});
	}    
	
	render(){

		var self = this;
		var hdr_buttons = [];
		var subheader = [];
		var akey;

		if(this.state.validUser){

			// Push the Logout button to the btn array
			hdr_buttons.push(
				<div style={styleobj.logout}  key="logout">
					<DropdownButton
						title={<Glyphicon glyph="user" style={styleobj.style_glyph_logout}/>}
						pullRight
						id="dropdown_profile"
					>
						<MenuItem header style={styleobj.drpdwntitle}>{this.state.username}</MenuItem>
						<LinkContainer to="/profile">
							<MenuItem>Profile</MenuItem>
						</LinkContainer>										
						<LinkContainer to="/logout">
							<MenuItem>Logout</MenuItem>
						</LinkContainer>						
					</DropdownButton>
				</div>
			);	

			// Push the nav bar to the subheader
			subheader.push(
			<div id="subheader" key="subheader" style={styleobj.subheader}>
				<Nav bsStyle="pills" onSelect={k => this.handleSelect(k)}>                 
					<LinkContainer to="/watchlist" active={!(this.state.activeKey > 0)}>
						<NavItem eventKey="1">						
							<Glyphicon glyph="home" style={styleobj.style_navglyph}/>My WatchList
						</NavItem>
					</LinkContainer>
					<LinkContainer to="/browseevents">
						<NavItem eventKey="2">
							<Glyphicon glyph="log-in" style={styleobj.style_navglyph}/>Browse Events            
						</NavItem>
					</LinkContainer>  
				</Nav>         
			</div>
			);
		}else{
			// Push the Login button to the btn array
			
			hdr_buttons.push(
				<div style={styleobj.login} key="login">
					<Link to="/login">
						<Button key="login" bsStyle="primary">Login</Button>
					</Link>
				</div>
			);		
		}

		return(
		<div id="div_header">
			<div style={styleobj.headerline}>
				<Grid style={{margin : '0px', padding : '0px', width : '100%'}}>
					<Row style={{margin : '0px', padding : '0px', width : '100%'}}>
						<Col xs={9} sm={4} style={{textAlign : 'left', margin : '0px', padding : '0px 0px'}}>
							<Image src="images/titleicon.jpg" thumbnail style={styleobj.img}/>			
							<LinkContainer to="/" style={styleobj.title}>
								<h3 style={styleobj.title}>Tech Explorer</h3>
							</LinkContainer>
						</Col>
						<Col xsHidden sm={6} style={{textAlign:'left', margin :'0px', padding:'0px 0px'}}>
							<div style={styleobj.searchbar}>
								<Form>
									<FormGroup>
									<InputGroup style={{'width' : '350px'}}>   
										<FormControl type="text" ref="searchval" placeholder="Search Event" 
											name="searchinput" 
											onChange={this.handleInptChange} 
											value={this.state.searchinput || ""}/>										
										<InputGroup.Addon style={{'cursor' : 'pointer'}}>
											<Link to={"/search/" + this.state.searchinput}>
												<Glyphicon glyph="search" style={styleobj.style_navglyph}/>
											</Link>	
										</InputGroup.Addon>										
									</InputGroup>									
									</FormGroup>
								</Form>										
							</div>
						</Col>						
						<Col xs={3} sm={2} style={{textAlign:'right', margin :'0px', padding:'0px 0px'}}>
							{hdr_buttons}
						</Col>
					</Row>
				</Grid>			
			</div>			
			{subheader}			
			<br/><br/>			
		</div>
		);
	}
}

export default Header;