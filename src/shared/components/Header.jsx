import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends React.Component{
	render(){
	return(
		<div id="Header">
			<center>
				<h3>Tech Explorer</h3>
			</center>
			<Link to="/">Home | </Link>
			<Link to="/login">Login | </Link>
			<Link to="/signup">Signup | </Link>
			<Link to="/logout">Logout </Link>
		</div>
		);
	}
}

export default Header;