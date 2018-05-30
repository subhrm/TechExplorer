import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Image, Button, Grid, Row, Col, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap';

import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
	headerline : {
		width : '100%',
		borderBottom : '1px solid lightgrey',
		position : 'fixed',
		top : '0px',
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
				}
};

class Header extends React.Component{

	constructor(props){
		super(props);

		this.state = {
						validUser : false
					};
		this._onChange = this._onChange.bind(this);
		this.fnGetDataFromStore = this.fnGetDataFromStore.bind(this);
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

	render(){

		var self = this;
		var hdr_buttons = [];
		var subheader = [];
		if(this.state.validUser){

			// Push the Logout button to the btn array
			hdr_buttons.push(
				<Link to="/logout" key="logout">
					<Button key="logout" bsStyle="primary">Logout</Button>
				</Link>
			);

			// Push the nav bar to the subheader
			subheader.push(
			<div id="subheader" key="subheader">
			<Navbar justified inverse collapseOnSelect style={{ margin : '0px 20px'}}>            
            	<Navbar.Header>
					<Navbar.Toggle />
            	</Navbar.Header>
				<Navbar.Collapse>
					<Nav>                 
						<NavItem style={styleobj.stylenavbarnav} componentClass="span">
							<Link to="/">
								<Glyphicon glyph="home" style={styleobj.style_navglyph}/>My WatchList
							</Link>
						</NavItem>
						<NavItem style={styleobj.stylenavbarnav} componentClass="span">
							<Link to="/watchlist">
								<Glyphicon glyph="log-in" style={styleobj.style_navglyph}/>Other Events
							</Link>                                    
						</NavItem>
						<NavItem style={styleobj.stylenavbarnav} componentClass="span">
							<Link to="/signup">
								<Glyphicon glyph="user" style={styleobj.style_navglyph}/>Profile
							</Link>
						</NavItem>
					</Nav>         
				</Navbar.Collapse>                
        	</Navbar>
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

			<div style={{height : '100px'}}>
				&nbsp;
			</div>

			<br/><br/>			
		</div>
		);
	}
}

export default Header;