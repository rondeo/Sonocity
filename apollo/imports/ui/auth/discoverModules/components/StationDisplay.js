import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import "../style/songDisplay.css"

import GET_STATION_DATA_BY_ID from '../queries/getStationDataById';

class StationDisplay extends Component {    

    state = {
        name: null,
        coverUrl: null        
    };

    componentDidMount() {
        this.props.getStationDataById.loading ? (null) : this.processIntake() 
    }

    componentDidUpdate(prevProps) {
        if(this.props.getStationDataById.station) {
            if (!this.state.name || this.props.getStationDataById.station.name !== prevProps.getStationDataById.station.name) {
                this.processIntake();
            }
        }
    }

    componentWillUnmount() {

    }

    processIntake = () => {
        this.setState({
            name: this.props.getStationDataById.station.name,
            coverUrl: this.props.getStationDataById.station.coverUrl
        })
    } 

    sendIndexUp = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    <div className = "songDisplay" onClick={this.sendIndexUp}>
                        {!this.state.name ? (null) 
                        : ( 
                            <Fragment>
                                <img src={this.state.coverUrl}/>
                                <div className="spaceDS">
                                <h6>{this.state.name}</h6>
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