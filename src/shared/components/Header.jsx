import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';

import AppStore from '../stores/AppStore.js';
var logmodule = require("./../Helper/log.js");
var log = logmodule.log;
const INFO = logmodule.INFO_LOG;
const DEBUG = logmodule.DEBUG_LOG;

const styleobj = {
	headerline : {
		width : '100%',
		height : '60px',
		borderBottom : '1px solid lightgrey',
		position : 'fixed',
		top : '0px',
		boxShadow : '1px 1px lightgrey',
		marginBottom : '10px'
	},
	title : {
		verticalAlign : 'middle',
		fontWeight : 'bold',
		padding : '0px 10px',
		display : 'inline-block'
	},

	img : {
		verticalAlign : 'middle',
		fontWeight : 'bold',
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
		if(this.state.validUser){
			hdr_buttons.push(
				<Link to="/logout" key="logout">
					<Button key="logout" bsStyle="primary">Logout</Button>
				</Link>
			);
		}else{
			hdr_buttons.push(
				<Link to="/login" key="login">
					<Button key="login" bsStyle="primary">Login</Button>
				</Link>
			);
		}

		return(
		<div id="div_header">

			<div style={styleobj.headerline}>
				<Image src="images/titleicon.jpg" thumbnail style={styleobj.img}/>			
				<h3 style={styleobj.title}>Tech Explorer</h3>
				<div style={styleobj.btn}>{hdr_buttons}</div>
			</div>
			

			<div style={{height : '80px'}}>
				&nbsp;
			</div>

			<Link to="/">Home | </Link>
			<Link to="/login">Login | </Link>
			<Link to="/signup">Signup | </Link>
			<Link to="/logout">Logout </Link>
			
		</div>
		);
	}
}

export default Header;