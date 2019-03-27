import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_STATION_DATA_BY_ID from './queries/getStationDataById';

import AudioPlayer from './components/AudioPlayer'

class StationPlayer extends Component {

    state = {
        context: null,
        stationId: null,
        stationName: null,
        stationDescription: null,
        upNext: null,
        currentAudioId: null,
        listName: null,
        ready: false,
        loopAll: false,
        loopOne: false
    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // (console.log("update"))
        
        if(this.props.getStationDataById !== null) {
            console.log(this.props.getStationDataById.station)

            if(prevProps.getStationDataById == null) {
                this.processIntake();
            // } else {
            //     if(this.props.content[3] !== prevProps.content[3]) {
            //         this.processIntake();
            //     }
            //     else if (JSON.stringify(this.props.content[0][0]) != JSON.stringify(prevProps.content[0][0]) && this.props.content[3] == prevProps.content[3] && this.props.content[0][0].length != 0){
            //         this.resetPlaylist();
            //     }
            //     else if (this.props.content[1] !== prevProps.content[1] && this.props.content[3] == prevProps.content[3]) {
            //         this.changePosition();  
            //     } 
            }
        } else {
            console.log("content is null")
        }
    }

    changePosition = () => { }

    processIntake = () => {
        this.setState({
            // currentSong: [this.props.content[1]],
            // name: this.props.content[3],
            // ready: true,
        })

    } 

    // keydown (e) {
    //     if(this.state.playList && this.state.ready) {
    //         switch(e.which) {
    //             case 37: this.previous();
    //             break;
        
    //             case 39: this.next(); 
    //             break; 
        
    //             default: return; // exit this handler for other keys
    //         }
    //         e.preventDefault(); // prevent the default action (scroll / move caret)
    //     }
    // }

    onEnd = () => {
        if(this.state.context == "playlist"){          
            if (this.state.loopOne){
                this.setState({
                    currentSong: this.state.currentSong
                })
            } else if(parseInt(this.state.currentSong) !== (this.state.playList[0].length - 1)) {  
                this.setState({
                    currentSong: parseInt(this.state.currentSong) + 1,
                })
            } else if (this.state.loopAll){
                this.setState({
                    currentSong: 0
                })
            } else {
                this.setState({
                    ready:false,
                    name: null
                })
            }

        }
    }

    next = () => {
        if(this.state.context == "playlist"){   
            if(parseInt(this.state.currentSong) !== (this.state.playList[0].length - 1)) {  
                this.setState({
                    currentSong: parseInt(this.state.currentSong) + 1,
                })
            } else if (this.state.loopAll){
                this.setState({
                    currentSong: 0
                })
            }
        }
    }

    previous = () => {}
    handleLoop = () => {}

    render() {
        return (
            <div className="playerModule">              
                <Fragment>
                    <div>   
                        {this.state.name ? (<h3>{this.state.name} {this.state.context}</h3>): (null)}
                        {this.state.ready ?  
                        <Fragment>
                            {/* {this.state.playList[0][this.state.currentSong] ? */}
                            <AudioPlayer context={this.state.context} next={this.next} previous={this.previous} onEnd={this.onEnd} handleLoop={this.handleLoop} loopAll={this.state.loopAll} loopOne={this.state.loopOne}
                                audioId={this.state.currentAudioId} 
                            /> 
                            {/* : (null) } */}
                        </Fragment>    
                        : (<h3> Station Player </h3>)} 
                    </div>  
                </Fragment>
            </div>
        )
    }
}

export default compose (

graphql(GET_STATION_DATA_BY_ID, {
    name: "getStationDataById",
}),

)(withApollo(StationPlayer));