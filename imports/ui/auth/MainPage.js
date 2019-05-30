import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import GET_USER_LIKED_AUDIO from './queries/getUserLikedAudio'
import GET_ALL_FOLLOWED_STATION from './queries/getAllFollowedStationId'
import GET_ALL_USER_AUDIO_ID from './queries/getAllUserAudioId'
import GET_POPULAR_STATIONS from './queries/getPopularStations'
import INSERT_INTO_LOCATION_HISTORY from "./queries/insertIntoLocationHistory"

import Discover from "./discoverModules/Discover"
import Player from "./player/Player"
import StationPlayer from "./player/StationPlayer"
import Station from "./station/Station"
import StationManager from "./station/components/StationManager"
import DiscoverRequestLayer from "./discoverModules/DiscoverRequestLayer"
import Search from "./discoverModules/Search"
import Messenger from "./messenger/Messenger"

import "./style/mainPage.css"

class MainPage extends Component {
    state = {
        station: false,
        messenger: false,
        playerContent: null,
        clear: false,
        stationPlayer: false,
        latMinRange: null,
        latMaxRange: null,
        longMinRange: null,
        longMaxRange: null,
        searchContent: null
    };

    componentDidMount() {
        let options = {
            enableHighAccuracy: true,
            maximumAge: 0
          };
        navigator.geolocation.getCurrentPosition(this.handleLocation, this.error, options);
    }

    error = () => {}

    handleLocation = l => {
        this.props.insertIntoLocationHistory({
            variables: {
                timeStamp: l.timestamp,
                latitude: l.coords.latitude,
                longitude: l.coords.longitude
            }
        });
        this.calculateLatLongOffset(l.coords.latitude, l.coords.longitude);
    }

    calculateLatLongOffset = (latitude, longitude) => {

        const lat = this.deg2rad(latitude);

        const m1 = 111132.95255;
        const m2 = -559.84957;
        const m3 = 1.17514;
        const m4 = -0.00230;
        const p1 = 111412.87733;
        const p2 = -93.50412;
        const p3 = 0.11774;

        const latlen = m1 + m2 * Math.cos(2 * lat) + m3 * Math.cos(4 * lat) + m4 * Math.cos(6 * lat);
        const longlen = p1 * Math.cos(lat) + p2 * Math.cos(3 * lat) + p3 * Math.cos(5 * lat);

        const latOffset = 5000/latlen;
        const longOffset = 5000/longlen;

        const latMinRange = latitude - latOffset;
        const latMaxRange = latitude + latOffset;
        const longMinRange = longitude - longOffset;
        const longMaxRange = longitude + longOffset;

        this.setState({
            latMinRange: latMinRange,
            latMaxRange: latMaxRange,
            longMinRange: longMinRange,
            longMaxRange: longMaxRange
        })
    }

    deg2rad = (deg) => {
	    const conv_factor = (2.0 * Math.PI)/360.0;
	    return(deg * conv_factor);
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

    stationOffline = () => {
        this.setState({
            playerContent: null,
            stationPlayer: false
        })
    }

    async logout() {
        Meteor.logout();
        this.props.client.cache.reset()
        this.props.client.resetStore();
    }

    handleSearch = (e) => {
        this.setState({
            searchContent: e.target.value
        })
    }

    render() {
        return (
            <div>   
                <Fragment>
                <div className="header">
                    <div className="logo"></div>
                    <div className="searchContainer">
                        <div className="searchBar">
                            <input onChange={this.handleSearch} type="search" placeholder="Search Tracks, Artists or Online Stations"></input>                  
                        </div>
                    </div>
                    <div className="nav">
                        
                        <button className="bigger"
                            onClick={()=> {
                                this.setState({station: !this.state.station})
                                this.state.messenger ? this.setState({messenger: false}) : (null)

                            }}
                        >
                            {this.state.station ? "X" : "Station" }
                        </button> 

                        <button className="bigger"
                            onClick={()=> {
                                this.setState({messenger: !this.state.messenger})
                                this.state.station ? this.setState({station: false}) : (null)
                            }}
                        >
                            {this.state.messenger ? "X" : "Mutuals" }
                        </button>                         
                        
                        <button className="logout"
                            onClick={()=> {
                                this.logout();
                            }}
                        >
                            Logout
                        </button>

                    </div>
                </div>

                <StationManager />
                
                {!this.state.stationPlayer ? (<Player content={this.state.playerContent} />) : (<StationPlayer ressourceId={this.state.playerContent[0][0][this.state.playerContent[1]]._id} _id={this.state.playerContent[0][0][this.state.playerContent[1]]._id} stationId={this.state.playerContent[0][0][this.state.playerContent[1]]._id} content={this.state.playerContent} offline={this.stationOffline} />)}

                <div className="core">

                    {this.state.station ? (<Station />) : (null) }

                    {this.state.messenger ? (<Messenger />) : (null)}

                    {this.state.searchContent && this.state.search !== "" ? <Search expression={this.state.searchContent} elemSelectedSong={this.songSelected} elemSelectedStation={this.stationSelected} /> :

                        <div>

                        {this.props.getAllFollowedStation.loading ? (null) : ( (this.props.getAllFollowedStation.userOnlineFollowedStation && this.props.getAllFollowedStation.userOnlineFollowedStation.length >  0) ? (<Discover context={"station"} name={"Followed stations"} idList={this.props.getAllFollowedStation.userOnlineFollowedStation} elemSelected={this.stationSelected} />) : (<h3 className="discoverInfo">No station you follow is currently online</h3>))}

                        {this.state.latMinRange && this.state.latMaxRange && this.state.longMinRange && this.state.longMaxRange ? (<DiscoverRequestLayer context={"station"} name={"Stations near you"} latMinRange={this.state.latMinRange} latMaxRange={this.state.latMaxRange} longMinRange={this.state.longMinRange} longMaxRange={this.state.longMaxRange} elemSelected={this.stationSelected} />): (<h3 className="discoverInfo">Turn on your localisation if you want to discover stations near you</h3>)}

                        {this.props.getPopularStations.loading ? (null) : ( (this.props.getPopularStations.popStations && this.props.getPopularStations.popStations.length >  0) ? (<Discover context={"station"} name={"Popular stations now"} idList={this.props.getPopularStations.popStations} elemSelected={this.stationSelected} />) : (<h3 className="discoverInfo">Try to listen to someone else station for a change</h3>))}

                        {this.props.getUserLikedAudio.loading ? (null) : ( this.props.getUserLikedAudio.userLikedAudio.length > 0 ? (<Discover context={"playlist"} name={"Your liked tracks"} idList={this.props.getUserLikedAudio.userLikedAudio} elemSelected={this.songSelected} />) : (<h3 className="discoverInfo">You haven't liked any tracks</h3>))}
                        
                        {this.props.getAllUserAudioId.loading ? (null) : ( this.props.getAllUserAudioId.userAudioId.length > 0 ? (<Discover context={"playlist"} name={"Your uploaded tracks"} idList={this.props.getAllUserAudioId.userAudioId} elemSelected={this.songSelected} />) : (<h3 className="discoverInfo">You haven't uploaded any tracks</h3>))}

                        {this.props.getAllAudioId.loading ? (null) : ( this.props.getAllAudioId.allAudioId.length > 0 ? (<Discover name={"Recent uploads"} context={"playlist"} idList={this.props.getAllAudioId.allAudioId} elemSelected={this.songSelected} />) : (<h3 className="discoverInfo">There is no recently uploaded tracks</h3>)) }
                    
                        </div>
                    }

                    </div>

                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_ALL_AUDIO_ID, {
        name: "getAllAudioId",
        options: {
            pollInterval: 2000
        }
    }),

    graphql(GET_USER_LIKED_AUDIO, {
        name: "getUserLikedAudio"
    }),

    graphql(GET_ALL_USER_AUDIO_ID, {
        name: "getAllUserAudioId"
    }),

    graphql(GET_ALL_FOLLOWED_STATION, {
        name: "getAllFollowedStation",
        options: {
            pollInterval: 2000
        }
    }),

    graphql(GET_POPULAR_STATIONS, {
        name: "getPopularStations",
        options: {
            pollInterval: 2000
        }
    }),

    graphql(INSERT_INTO_LOCATION_HISTORY, {
        name: "insertIntoLocationHistory"
    }),

)(withApollo(MainPage));