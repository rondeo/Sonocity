import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_STATION_DATA_BY_ID from './queries/getStationDataById';

import INSERT_FOLLOWED_STATION from './queries/insertFollowedStation'
import IS_STATION_FOLLOWED from './queries/isStationFollowed'
import REMOVE_FOLLOWED_STATION from './queries/removeFollowedStation'
import FOLLOWED_COUNT from './queries/followedCount'

import AudioPlayer from './components/AudioPlayer'

import "./style/stationPlayer.css"

class StationPlayer extends Component {

    state = {
        stationId :null,
        context: null,
        stationName: null,
        stationDescription: null,
        upNext: null,
        currentAudioId: null,
        ready: false,
        loopAll: false,
        loopOne: false,
        syncTime: null,
        coverUrl: null,
        followed: null,
        status: true,
        timeStamp:null
    };

    componentDidMount() {
        this.props.getStationDataById.loading ?  (null) : this.processIntake()
    }

    componentDidUpdate(prevProps) {
        
        if(!this.state.status) {
            if(!this.props.getStationDataById.loading){
                this.props.getStationDataById.refetch();
            }
        } else if(this.props.getStationDataById.station) {
            if(this.props._id !== this.state.stationId) {
                this.processIntake();
            } else if(this.props.getStationDataById.station.currentAudio !== this.state.currentAudioId) {
                this.audioUpdate();
            } else if(this.props.getStationDataById.station.timeStamp !== this.state.timeStamp) {
                this.processIntake();
            
            } if(!this.props.getStationDataById.loading){ 
                if (this.props.getStationDataById.station.status != this.state.status) {
                    this.statusUpdate();
                }    
            } if (this.props.getStationDataById.station.name !== this.state.stationName) {
                this.nameUpdate();
            } if (this.props.getStationDataById.station.description !== this.state.stationDescription){
                this.descriptionUpdate();
            } if (this.props.getStationDataById.station.coverUrl !== this.state.coverUrl) {
                this.coverUrlUpdate();
            }
        }
    }

    processIntake = () => {
        this.setState({
            stationId: this.props._id,
            context: "station",
            stationName: this.props.getStationDataById.station.name,
            stationDescription: this.props.getStationDataById.station.description,
            upNext: this.props.getStationDataById.station.upNext,
            currentAudioId: this.props.getStationDataById.station.currentAudio,
            syncTime: (Date.now() - this.props.getStationDataById.station.timeStamp)/1000,
            coverUrl: this.props.getStationDataById.station.coverUrl,
            ready: true,
            followed: null,
            status:true,
            timeStamp: this.props.getStationDataById.station.timeStamp
        })
        this.props.isStationFollowed.refetch();
        this.props.followedCount.refetch();
    } 

    statusUpdate(){
        this.setState({
            status: this.props.getStationDataById.station.status,
        })
    }

    audioUpdate = () => { 
        this.setState({
            currentAudioId: this.props.getStationDataById.station.currentAudio,
            syncTime: null,
            status: true
        })
    }

    nameUpdate = () => {
        this.setState({
            stationName: this.props.getStationDataById.station.name,
        })
    }

    descriptionUpdate = () => {
        this.setState({
            stationDescription: this.props.getStationDataById.station.description,
        })
    }

    coverUrlUpdate = () => {
        this.setState({
            coverUrl: this.props.getStationDataById.station.coverUrl,
        })
    }

    getSync = () => {
        return (Date.now() - this.props.getStationDataById.station.timeStamp)/1000;
    }

    onEnd = () => {
        this.props.getStationDataById.refetch();
    }

    stationOffline = () => {
        this.props.offline();
    }

    stationRefetch = () => {
        this.props.getStationDataById.refetch();
    }

    next = () => {}
    previous = () => {}
    handleLoop = () => {}

    addFollowed = () => {
        const follow = this.props.insertFollowedStation({
            variables: {
                stationId: this.props.stationId
            }
        });
    }

    removeFollowed = () => {
        const follow = this.props.removeFollowedStation({
            variables: {
                stationId: this.props.stationId
            }
        });
    }

    followedChange = () => {
        if(this.state.followed == null){
            if(!this.props.isStationFollowed.isStationFollowed) {
                this.addFollowed();
                this.setState({followed: true})
                console.log("added1rst")
            } else {
                this.removeFollowed();
                this.setState({followed: false})
                console.log("removed1rst")
            }
        } else {
            if(this.state.followed){
                this.removeFollowed();
                this.setState({followed: false})
                console.log("removed")
            } else {
                this.addFollowed();
                this.setState({followed: true})
                console.log("added")
            }
        }
    }

    render() {
        return (
            <div>
            {!this.state.status ? (<h3 className="discoverInfo">The station just went offline</h3>) : 
            (<Fragment>
            <div className="playerModuleStation">              
                <Fragment>
                    <div className="stationPlayer">   
                        <div className="stationInfos">
                            <div className="stPlrCoverAndName">
                                <div className="stPlrCover">
                                    {this.state.coverUrl ? (<img src={this.state.coverUrl}/>): (null)}
                                </div>
                                <div className="stPlrName">
                                    {this.state.stationName ? (<h3>@{this.state.stationName}</h3>): (null)}
                                    {this.props.followedCount.followedStationCount ? (<h5>{this.props.followedCount.followedStationCount} followers</h5>) : <h5>0 followers</h5>}
                                    {this.props.isStationFollowed.loading ?
                                        (null)
                                        :
                                        (<button className="follow"
                                            onClick={()=> {
                                                this.followedChange();
                                            }}
                                        >
                                            {(this.props.isStationFollowed.isStationFollowed && this.state.followed == null) ? "UnFollow" : (this.state.followed ? "UnFollow" : "Follow") }
                                        </button>)
                                    }
                                    {this.state.stationDescription ? (<h4>{this.state.stationDescription}</h4>): (null)}
                                </div>
                            </div>
                        </div>
                        <div className="stationAudioPlayer">
                            {this.state.ready ?  
                                <AudioPlayer stationName={this.state.stationName} context={this.state.context} getSync={this.getSync} synchro={this.state.syncTime} offline={this.stationOffline} next={this.next} previous={this.previous} onEnd={this.onEnd} handleLoop={this.handleLoop} loopAll={this.state.loopAll} loopOne={this.state.loopOne}
                                    audioId={this.state.currentAudioId} 
                                /> 
                            : (<h3> Station Player </h3>)} 
                        </div>
                        <div className="upNextStationPlayer">
                        </div>
                    </div>  
                </Fragment>
            </div>
            </Fragment>)}
           </div>
        )
    }
}

export default compose (

graphql(GET_STATION_DATA_BY_ID, {
    name: "getStationDataById",
}),

graphql(IS_STATION_FOLLOWED, {
    name: "isStationFollowed"
}),

graphql(FOLLOWED_COUNT, {
    name: "followedCount"
}),

graphql(INSERT_FOLLOWED_STATION, {
    name: "insertFollowedStation",
    options: {
        refetchQueries: ["FOLLOWED_COUNT", "GET_ALL_FOLLOWED_STATION"]
    }
}),

graphql(REMOVE_FOLLOWED_STATION, {
    name: "removeFollowedStation",
    options: {
        refetchQueries: ["FOLLOWED_COUNT", "GET_ALL_FOLLOWED_STATION"]
    }
}),

)(withApollo(StationPlayer));