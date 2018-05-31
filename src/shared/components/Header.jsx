import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Image, Button, Grid, Row, Col, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap';
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
		display : 'inline-block'
	},

	img : {
		verticalAlign : 'middle',
		padding : '5px 5px',
		margin : '0px 10px',
		height : '40px',
		widtht : 'auto'
	},

	btn : {
		textAlign : 'right',
		verticalAlign : 'middle',
		margin : '0px 20px',
		display : 'inline-block'
	},

	style_navglyph : {'margin' : '3px'},

	stylenavbarnav: {
						padding: '10px',
						display: 'inline-block',
						lineHeight: '20px'
				},

	subheader : {
					border : '1px solid lightgrey',
					boxShadow : '1px 1px lightgrey',
					margin : '0px'
				}
};

class Header extends React.Component{

	constructor(props){
		super(props);

		this.state = {
						validUser : false,
						activeKey : 0
					};
		this._onChange = this._onChange.bind(this);
		this.fnGetDataFromStore = this.fnGetDataFromStore.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
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
		this.setState(this.state);
	}

	// Function to handle the Nav Selection
	handleSelect(selectedKey) {
		this.state.activeKey = selectedKey;
		this.setState(this.state);
	}

	render(){

		var self = this;
		var hdr_buttons = [];
		var subheader = [];
		var akey;

		console.log(akey);
		if(this.state.validUser){

			// Push the Logout button to the btn array
			hdr_buttons.push(
				<Link to="/logout" key="logout">
					<Button key="logout" bsStyle="primary">Logout</Button>
				</Link>
			);

			// Push the nav bar to the subheader
			subheader.push(
			<div id="subheader" key="subheader" style={styleobj.subheader}>
				<Nav bsStyle="pills" justified onSelect={k => this.handleSelect(k)}>                 
					<LinkContainer to="/watchlist" active={!(this.state.activeKey > 0)}>
						<NavItem eventKey="1">						
							<Glyphicon glyph="home" style={styleobj.style_navglyph}/>My WatchList
						</NavItem>
					</LinkContainer>
					<LinkContainer to="/userevents">
						<NavItem eventKey="2">
							<Glyphicon glyph="log-in" style={styleobj.style_navglyph}/>Other Events            
						</NavItem>
					</LinkContainer>  
					<LinkContainer to="/profile">
						<NavItem eventKey="3">
							<Glyphicon glyph="user" style={styleobj.style_navglyph}/>Profile
						</NavItem>
					</LinkContainer>
				</Nav>         
			</div>
			);
		}else{
			// Push the Login button to the btn array
			hdr_buttons.push(
				<Link to="/login" key="login">
					<Button key="login" bsStyle="primary">Login</Button>
				</Link>
			);
		}

		return(
		<div id="div_header">
			<div style={styleobj.headerline}>
				<Grid style={{margin : '0px', padding : '0px', width : '100%'}}>
					<Row>
						<Col xs={9} sm={11} style={{textAlign : 'left', margin : '0px', padding : '0px 0px 0px 20px'}}>
							<Image src="images/titleicon.jpg" thumbnail style={styleobj.img}/>			
							<h3 style={styleobj.title}>Tech Explorer</h3>
						</Col>
						<Col xs={3} sm={1} style={{ margin :'0px', padding:'10px 1px'}} id="header_btn">
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