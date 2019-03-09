import React, { Component, Fragment } from 'react'

import AudioPlayer from './components/AudioPlayer'

export default class DiscoverAllSongs extends Component {
    state = {
        context: null,
        playList: null,
        stationId: null,
        currentSong: null,
        name: null,
        ready: false
    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        // (console.log("update"))
        
        if(this.props.content !== null){
            if(prevProps.content == null) {
                this.processIntake();
            } else {
                if(this.props.content[3] !== prevProps.content[3]) {
                    this.processIntake();
                }
                else if (this.props.content[1] !== prevProps.content[1] && this.props.content[3] == prevProps.content[3]) {
                    this.changePosition();  
                }
            }
        } else {
            console.log("content is null")
        }
    }

    changePosition = () => {
        this.setState({
            currentSong: [this.props.content[1]]
        })
    }

    processIntake = () => {

        this.props.content[2] == "playlist" ? 
        
        this.setState({
            context: this.props.content[2],
            playList: this.props.content[0],
            currentSong: [this.props.content[1]],
            name: this.props.content[3],
            ready: true
        })

        : (null)

    } 

    onEnd = () => {
        if(this.state.context == "playlist"){
            if(parseInt(this.state.currentSong) !== (this.state.playList[0].length - 1)) {  
                this.setState({
                    currentSong: parseInt(this.state.currentSong) + 1,
                })
            }
        }
    }
    
    render() {
        return (
            <div>              
                <Fragment>
                    <div>   
                        {/* {this.state.name ? console.log(this.state.playList[0].length) : (null)} */}
                        {this.state.name ? (<h2>{this.state.name} Playlist</h2>): (null)}
                        {this.state.playList && this.state.ready ?  
                        <Fragment>
                            <AudioPlayer onEnd={this.onEnd} audioId={this.state.playList[0][this.state.currentSong]._id} /> 
                            {this.state.context == "playlist" ?
                            <Fragment>
                                <button 
                                onClick={()=> {
                                    if(parseInt(this.state.currentSong) !== 0)
                                        this.setState({currentSong: parseInt(this.state.currentSong) - 1,})
                                    else{
                                        this.setState({currentSong: parseInt(this.state.currentSong)})
                                    }
                                }}
                                >
                                    Previous
                                </button> 
                                <button 
                                    onClick={()=> {
                                        this.onEnd();
                                    }}
                                >
                                    Next
                                </button>
                            </Fragment>    
                            : (null) 
                            }
                        </Fragment>    
                        : (<h3>Browse our collections and select something to listen to !</h3>)} 
                       
                    </div>  
                </Fragment>
            </div>
        )
    }
}