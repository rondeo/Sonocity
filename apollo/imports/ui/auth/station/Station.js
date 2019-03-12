import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UploadModule from '../uploadModule/UploadModule'

import GET_USER_STATION from './queries/getStationDataByUserId'

import Profile from './components/Profile'

class Station extends Component {
    state = {
        name: null,
        description: null,
        currentAudio: null,
        upNext: null,
        broadcast: null,
        timeStamp: null,
        upload: false,
    };

    componentDidMount() {
        if(!this.props.getUserStation.loading || this.state.name) {
            console.log(this.props.getUserStation.userStation.name)
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
                } else if (this.props.getUserStation.userStation.name !== this.state.name) {
                    this.nameUpdate();
                } else if (this.props.getUserStation.userStation.description !== this.state.description) {
                    this.descriptionUpdate();
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
            timeStamp: this.props.getUserStation.userStation.timeStamp
        })
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
            timeStamp: this.props.getUserStation.userStation.timeStamp
        })
    }

    render() {
        return (
            <div>   
                <Fragment>
                    { this.state.name ? <Profile name={this.state.name} description={this.state.description} /> : (console.log("ok")) }  
                    <button 
                        onClick={()=> {
                            this.setState({upload: !this.state.upload})
                        }}
                    >
                        {this.state.upload ? "Cancel" : "Upload" }
                    </button> 
                {this.state.upload ? (<UploadModule  uploadSuccess={this.uploadComplete}/>) : (null) } 
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