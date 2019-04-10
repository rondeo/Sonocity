import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UploadModule from '../uploadModule/UploadModule'

import GET_USER_STATION from './queries/getStationDataByUserId'

import Profile from './components/Profile'
import CurrentAudio from './components/CurrentAudio'
import UpNextMgmt from './components/UpNextMgmt'

import "./style/station.css"

class Station extends Component {
    state = {
        name: null,
        description: null,
        currentAudio: null,
        upNext: [],
        broadcast: null,
        timeStamp: null,
        upload: false,
        coverUrl: null,
        status: false,
    };

    componentDidMount() {
        if(!this.props.getUserStation.loading || this.state.name) {
            if(!this.state.name) {
                this.processIntake();
            } else {
                console.log("name exist")
            }
        } else {
            console.log("content is null")
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.getUserStation.userStation.name || this.state.name) {
            if(!this.state.name) {
                this.processIntake();
            } else {
                if(this.props.getUserStation.userStation.timeStamp !== this.state.timeStamp) {
                    this.audioUpdate();
                }
                if (this.props.getUserStation.userStation.name !== this.state.name) {
                    this.nameUpdate();
                }
                if (this.props.getUserStation.userStation.description !== this.state.description) {
                    this.descriptionUpdate();
                }
                if (this.props.getUserStation.userStation.status != this.state.status){
                    this.statusUpdate();
                }
                if (JSON.stringify(this.props.getUserStation.userStation.upNext) !== JSON.stringify(this.state.upNext)) {
                    this.upNextUpdate();
                }
            }
        } else {
            console.log("content is null")
        }
    }

    audioUpdate = () => {
        this.setState({
            currentAudio: this.props.getUserStation.userStation.currentAudio,
            upNext: this.props.getUserStation.userStation.upNext,
            broadcast: this.props.getUserStation.userStation.broadcast,
            timeStamp: this.props.getUserStation.userStation.timeStamp,
            status: this.props.getUserStation.userStation.status
        })
    }

    upNextUpdate = () => {
        this.setState({
            upNext: this.props.getUserStation.userStation.upNext
        })
    }

    statusUpdate = () => {
        this.setState({status: this.props.getUserStation.userStation.status})
    }

    nameUpdate = () => {
        this.setState({
            name: this.props.getUserStation.userStation.name,
        })
    }

    descriptionUpdate = () => {
        this.setState({
            description: this.props.getUserStation.userStation.description,
        })
    }

    uploadComplete = () => {
        this.setState({upload: !this.state.upload})
    }

    processIntake = () => {
        this.props.getUserStation.loading ? (null) : this.setState({
            name: this.props.getUserStation.userStation.name,
            description: this.props.getUserStation.userStation.description,
            currentAudio: this.props.getUserStation.userStation.currentAudio,
            upNext: this.props.getUserStation.userStation.upNext,
            broadcast: this.props.getUserStation.userStation.broadcast,
            timeStamp: this.props.getUserStation.userStation.timeStamp,
            coverUrl: this.props.getUserStation.userStation.coverUrl,
            status: this.props.getUserStation.userStation.status,
        })
    }

    render() {
        return (
            <div>   
                <Fragment>
                    <div className="myStationCore">
                        <div className="myStationProfile">
                            {this.state.name ? <Profile name={this.state.name} description={this.state.description} coverUrl={this.state.coverUrl} /> : (null)}  
                            <button 
                                onClick={()=> {
                                    this.setState({upload: !this.state.upload})
                                }}
                            >
                                {this.state.upload ? "Cancel" : "Upload Audio" }
                            </button> 
                            {this.state.upload ? (<UploadModule  uploadSuccess={this.uploadComplete}/>) : (null) } 
                        </div>

                        <div className="myStationCurrentlyPlaying">
                            <h3>Now playing </h3>
                            {this.state.status ? <CurrentAudio currentUpdate={this.props.getUserStation.refetch()} audioId={this.state.currentAudio} timeStamp={this.state.timeStamp} /> : <h3>Offline</h3>}
                        </div>

                        <div className="myStationUpNext">
                            <h3>Up Next </h3>
                            {this.state.status ? (this.state.upNext[0] ? <UpNextMgmt upNext={this.state.upNext}/> : <h3>Nothing in up next</h3>) : <h3>Offline</h3>}
                        </div>

                        <div className="myStationRecentComment">
                                <h3>Last feedback </h3>
                                {this.state.status ? (this.state.comments ?
                                <div className="stationCommentsCore">
                            
                                </div>    
                                : <h3>None</h3>) : (<h3>Offline</h3>)}
                        </div>

                    </div>
                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_USER_STATION, {
        name: "getUserStation"
    }),

)(withApollo(Station));