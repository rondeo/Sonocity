import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_ALL_AUDIO_ID from './queries/getAllAudioId'
import GET_USER_LIKED_AUDIO from './queries/getUserLikedAudio'
// import CLEAR_UP_NEXT from './queries/clearUpNext'
// import GET_ALL_ONLINE_STATION from './queries/getAllOnlineStationId'
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
import { Icon } from '@material-ui/core';

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
        // this.setState({
        //     clear: this.clear()
        // })
        // this.timer = setInterval(() => { 
        //     this.props.getAllOnlineStation.refetch();
        //     this.props.getAllFollowedStation.refetch();
        // }, 20000);
        let options = {
            enableHighAccuracy: true,
            maximumAge: 0
          };
        navigator.geolocation.getCurrentPosition(this.handleLocation, this.error, options);
    }

    error = (err) => {
        
    }

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

    componentWillUnmount() {
        // clearInterval(this.timer);
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

    async clear() {
        return await this.props.clearUpNext();
    }

    async logout() {
        // await this.clear();
        this.props.client.resetStore();
        this.props.client.cache.reset()
        Meteor.logout();
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
                {/* now this would mean that someone who's deconnected from the server will keep his station state*/}
                {/* <StationManager /> */}

                
                {!this.state.stationPlayer ? (<Player content={this.state.playerContent} />) : (<StationPlayer ressourceId={this.state.playerContent[0][0][this.state.playerContent[1]]._id} _id={this.state.playerContent[0][0][this.state.playerContent[1]]._id} stationId={this.state.playerContent[0][0][this.state.playerContent[1]]._id} content={this.state.playerContent} offline={this.stationOffline} />)}


                <div className="core">

                    {this.state.station ? (<Station />) : (null) }

                    {this.state.messenger ? (<Messenger />) : (null)}

                    {this.state.searchContent && this.state.search !== "" ? <Search expression={this.state.searchContent} elemSelectedSong={this.songSelected} elemSelectedStation={this.stationSelected} /> :

                        <div>

                        {this.props.getAllFollowedStation.loading ? (null) : ( (this.props.getAllFollowedStation.userOnlineFollowedStation && this.props.getAllFollowedStation.userOnlineFollowedStation.length >  0) ? (<Discover context={"station"} name={"Followed stations"} idList={this.props.getAllFollowedStation.userOnlineFollowedStation} elemSelected={this.stationSelected} />) : (<h3 className="discoverInfo">No station you follow is currently online</h3>))}

                        {this.state.latMinRange && this.state.latMaxRange && this.state.longMinRange && this.state.longMaxRange ? (<DiscoverRequestLayer context={"station"} name={"Stations near you"} latMinRange={this.state.latMinRange} latMaxRange={this.state.latMaxRange} longMinRange={this.state.longMinRange} longMaxRange={this.state.longMaxRange} elemSelected={this.stationSelected} />): (null)}

                        {this.props.getPopularStations.loading ? (null) : ( (this.props.getPopularStations.popStations && this.props.getPopularStations.popStations.length >  0) ? (<Discover context={"station"} name={"Popular stations now"} idList={this.props.getPopularStations.popStations} elemSelected={this.stationSelected} />) : (null))}

                        {/* {this.props.getAllOnlineStation.loading ? (<p>loading</p>) : ( (this.props.getAllOnlineStation.onlineStations && this.props.getAllOnlineStation.onlineStations.length >  0) ? (<Discover context={"station"} name={"Online stations"} idList={this.props.getAllOnlineStation.onlineStations} elemSelected={this.stationSelected} />) : (<h3>There is no other online stations</h3>))} */}

                        {this.props.getUserLikedAudio.loading ? (null) : ( this.props.getUserLikedAudio.userLikedAudio.length > 0 ? (<Discover context={"playlist"} name={"Your liked tracks"} idList={this.props.getUserLikedAudio.userLikedAudio} elemSelected={this.songSelected} />) : (null))}
                        
                        {this.props.getAllUserAudioId.loading ? (null) : ( this.props.getAllUserAudioId.userAudioId.length > 0 ? (<Discover context={"playlist"} name={"Your uploaded tracks"} idList={this.props.getAllUserAudioId.userAudioId} elemSelected={this.songSelected} />) : (null))}

                        {this.props.getAllAudioId.loading ? (null) : (<Discover name={"All tracks"} context={"playlist"} idList={this.props.getAllAudioId.allAudioId} elemSelected={this.songSelected} />)}
                    
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
        name: "getAllAudioId"
    }),

    graphql(GET_USER_LIKED_AUDIO, {
        name: "getUserLikedAudio"
    }),

    // graphql(GET_ALL_ONLINE_STATION, {
    //     name: "getAllOnlineStation"
    // }),

    graphql(GET_ALL_USER_AUDIO_ID, {
        name: "getAllUserAudioId"
    }),

    graphql(GET_ALL_FOLLOWED_STATION, {
        name: "getAllFollowedStation",
        options: {
            pollInterval: 10000
        }
    }),

    graphql(GET_POPULAR_STATIONS, {
        name: "getPopularStations",
        options: {
            pollInterval: 30000
        }
    }),

    graphql(INSERT_INTO_LOCATION_HISTORY, {
        name: "insertIntoLocationHistory"
    }),

    // graphql(CLEAR_UP_NEXT, {
    //     name: "clearUpNext",
    // }),

)(withApollo(MainPage));