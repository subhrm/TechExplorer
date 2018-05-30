import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const styleobj = {
    style_footer : {            
             width : '100%',
             verticalAlign : 'middle',
             position : 'fixed',
             bottom : '0px'
        },
    style_footer1 : {
        height : '30px',
        width : '100%',
        backgroundColor: '#1b3a6d',
        color : 'white',
        margin : '0px 0px 1px 0px',
        padding : '5px',
        textAlign:'center'
    },
    style_footer2 : {
        width : '100%',
        backgroundColor: 'grey',
        color : 'white',
        margin : '0px 0px',
        padding : '10px',
        textAlign:'center',
        fontSize : "125%",
        verticalAlign : 'bottom'
    },
    style_grid : {
        padding : '0px',
        margin : '0px',
        width : '100%'
    }
};

class Footer extends React.Component{
	
	constructor(props){
		super(props);
    }
    	
	render(){
		return(
			<div id="div_footer" style={styleobj.style_footer}>
                <Grid style={styleobj.style_grid}>
                    <Row>
                        <Col xsHidden sm={12}>
                            <p style={styleobj.style_footer2}> Infosys - STGPW &nbsp;&nbsp;|&nbsp;&nbsp;  Makeathon Event &nbsp;&nbsp;|&nbsp;&nbsp; Tech Explorer by CharMinar Team</p>
                        </Col>
                    </Row>
                </Grid>                
				<p style={styleobj.style_footer1}>Copyright &copy; 2018 Infosys Limited - All rights reserved</p>
			</div>
		);
	}
}

export default Footer;