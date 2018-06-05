import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

const styleobj = {
    style_border : {
             border: '1px solid black',
             height: '200px',
        },

    style_col : {
        padding: '5px'
    },

    border : {
        border: '1px solid black',
    }
};

class Events extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<div id='div_events' style={styleobj.border}>
                    <div style={styleobj.style_border}>
                        image
                    </div>

                    <div style={styleobj.style_col}> 
                    <br/>
                        <strong>{this.props.ename}</strong>
                    </div>

                    <div style={styleobj.style_col}>
                    <br/>
                        <p>{this.props.edesc}</p>
                        <p>{this.props.edate}</p>
                    </div>
                </div>
        );
    }
}

export default Events;
