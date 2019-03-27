import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import GET_USER_LIKED_AUDIO from './queries/getUserLikedAudio'
import CLEAR_UP_NEXT from './queries/clearUpNext'
import GET_ALL_ONLINE_STATION from './queries/getAllOnlineStationId'

import Discover from "./discoverModules/Discover"
import Player from "./player/Player"
import StationPlayer from "./player/StationPlayer"
import Station from "./station/Station"
import StationManager from "./station/components/StationManager"

import "./style/mainPage.css"

class MainPage extends Component {
    state = {
        station: false,
        playerContent: null,
        clear: false,
        stationPlayer: false
    };

    componentDidMount() {
        this.setState({
            clear: this.clear()
        })
        this.timer = setInterval(() => { 
            this.props.getAllOnlineStation.refetch();
        }, 20000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    songSelected = (listId, i, context, name) => {
        this.setState({
            playerContent: [listId, i, context, name],
            stationPlayer: false
        })
    }

    stationSelected = (listId, i, context, name) => {
        this.setState({
            playerContent: [listId, i, context, name],
            stationPlayer: true
        })
    }

    async clear() {
        return await this.props.clearUpNext();
    }

    render() {
        return (
            <div>   
                <Fragment>

                {this.state.clear ? <StationManager /> : (null)}

                <button 
                    onClick={()=> {
                        Meteor.logout();
                        this.props.client.cache.reset()
                        this.props.client.resetStore();
                    }}
                >
                    Logout
                </button>

                <button 
                    onClick={()=> {
                        this.setState({station: !this.state.station})
                    }}
                >
                    {this.state.station ? "Close" : "Station" }
                </button> 

                {this.state.station ? (<Station />) : (null) }

                {!this.state.stationPlayer ? (<Player content={this.state.playerContent} />) : (<StationPlayer stationId={this.state.playerContent[0][0][this.state.playerContent[1]]._id} content={this.state.playerContent} />)}

                <div className="core">

                {this.props.getAllOnlineStation.loading ? (<p>loading</p>) : ( (this.props.getAllOnlineStation.onlineStations && this.props.getAllOnlineStation.onlineStations.length >  0) ? (<Discover context={"station"} name={"Online Stations"} idList={this.props.getAllOnlineStation.onlineStations} elemSelected={this.stationSelected} />) : (<h3>There is no other online stations</h3>))}

                {this.props.getUserLikedAudio.loading ? (<p>loading</p>) : ( this.props.getUserLikedAudio.userLikedAudio.length > 0 ? (<Discover context={"playlist"} name={"Your liked songs"} idList={this.props.getUserLikedAudio.userLikedAudio} elemSelected={this.songSelected} />) : (null))}
                
                {this.props.getAllAudioId.loading ? (<p>loading</p>) : (<Discover name={"All songs"} context={"playlist"} idList={this.props.getAllAudioId.allAudioId} elemSelected={this.songSelected} />)}
                
                </div>

                {console.log(this.state.playerContent)}

                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_ALL_AUDIO_ID, {
        name: "getAllAudioId"
    }),

    graphql(GET_USER_LIKED_AUDIO, {
        name: "getUserLikedAudio"
    }),

    graphql(GET_ALL_ONLINE_STATION, {
        name: "getAllOnlineStation"
    }),

    graphql(CLEAR_UP_NEXT, {
        name: "clearUpNext",
    }),

)(withApollo(MainPage));