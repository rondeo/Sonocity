import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import "../style/songDisplay.css"

import GET_STATION_DATA_BY_ID from '../queries/getStationDataById';

class StationDisplay extends Component {    

    sendIndexUp = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "songDisplay" onClick={this.sendIndexUp}>
                        {this.props.getStationDataById.loading ? (null) 
                        : ( 
                            <Fragment>
                                <img src={this.props.getStationDataById.station.coverUrl}/>
                                <div className="spaceDS">
                                <h6>{this.props.getStationDataById.station.name}</h6>
                                </div>
                            </Fragment>
                        )}
                    </div>  
                </Fragment>
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_STATION_DATA_BY_ID, {
        name: "getStationDataById"
    }),

)(withApollo(StationDisplay));