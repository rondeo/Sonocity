import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import GET_STATION_IN_PROXIMITY from './queries/getStationInProximity';

import Discover from './Discover'

class DiscoverRequestLayer extends Component {    

    state = {
        name: null,
        context: null
    };

    componentDidMount() {

        this.setState({
            name: this.props.name,
            context: this.props.context
        })
        
        // this.timer = setInterval(() => { 
        //     this.props.getStationInProximity.refetch();
        // }, 20000);
        
    }

    elemSelected = (listId, i, context, name) => {
        this.props.elemSelected(listId, i, context, name);
    }

    render() {
        return (
            <div>              
                <Fragment>
                    {this.props.getStationInProximity.loading ? (null) : ( (this.props.getStationInProximity.stationInProximity && this.props.getStationInProximity.stationInProximity.length >  0) ? (<Discover context={this.state.context} name={this.state.name} idList={this.props.getStationInProximity.stationInProximity} elemSelected={this.elemSelected} />) : (<h3 className="discoverInfo">There is no station in your vicinity</h3>))}
                </Fragment>
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_STATION_IN_PROXIMITY, {
        name: "getStationInProximity",
        options: {
            pollInterval: 2000
        }
    }),

)(withApollo(DiscoverRequestLayer));