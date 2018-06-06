import React from 'react';
import { Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';

const styleobj = {
    style_border : {
        border: '1px solid black',
        borderRadius: '10px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',             
        height: '200px',
        },

    style_col : {
        padding: '5px'
    },

    border : {
        border: '1px solid black',
        borderRadius: '10px'
    },

    style_glyph : {
        padding: '5px'
    }
};

class Events extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<div id='div_events' style={styleobj.border}>
                    <div style={styleobj.style_border}>
                        <br/>image
                    </div>

                    <div style={styleobj.style_col}> 
                    <br/>
                        <strong>{this.props.ename}</strong>
                    </div>

                    <div style={styleobj.style_col}>
                    <br/>
                        <p>{this.props.edesc}</p>
                        <p>
                            <Glyphicon glyph="calendar" style={styleobj.style_glyph}/>
                            {this.props.edate}
                        </p>
                        <p>
                            <Glyphicon glyph="map-marker" style={styleobj.style_glyph}/>
                            {this.props.eloc}
                        </p>
                    </div>
                </div>
        );
    }
}

export default Events;
