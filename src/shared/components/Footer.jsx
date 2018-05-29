import React from 'react';

const styleobj = {
    style_footer : {
            'textAlign':'center', 
             width : '100%',
             height : '25px',
             backgroundColor: 'lightgrey',
             color : 'grey',
             margin : '0px 0px',
             position : 'fixed',
             bottom : '0px'
        }
};

class Footer extends React.Component{
	
	constructor(props){
		super(props);
    }
    	
	render(){
		return(
			<div id="div_footer" style={styleobj.style_footer}>
				<p>&copy; 2018 Infosys - STGPW |  Makeathon Event | Tech Explorer by CharMinar Team</p>
			</div>
		);
	}
}

export default Footer;