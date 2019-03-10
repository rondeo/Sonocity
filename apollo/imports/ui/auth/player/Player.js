import React, { Component, Fragment } from 'react'

import AudioPlayer from './components/AudioPlayer'

export default class Player extends Component {
    constructor(props){
    super(props);
    this.state = {
        context: null,
        playList: null,
        stationId: null,
        currentSong: null,
        name: null,
        ready: false,
        loop: false
    };
    this.keydown = this.keydown.bind(this);
    }


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


    keydown (e) {
        if(this.state.playList && this.state.ready) {
            switch(e.which) {
                case 37: this.previous();
                break;
        
                case 39: this.next(); 
                break; 
        
                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        }
    }

    next = () => {
        if(this.state.context == "playlist"){
            if(parseInt(this.state.currentSong) !== (this.state.playList[0].length - 1)) {  
                this.setState({
                    currentSong: parseInt(this.state.currentSong) + 1,
                })
            } else if (this.state.loop){
                this.setState({
                    currentSong: 0
                })
            }
        }

    }

    previous = () => {
        if(parseInt(this.state.currentSong) !== 0)
            this.setState({currentSong: parseInt(this.state.currentSong) - 1,})
        else if (this.state.loop){
            this.setState({currentSong: this.state.playList[0].length - 1})
        }
    }
    
    render() {
        return (
            <div onKeyDown={this.keydown}>              
                <Fragment>
                    <div>   
                        {/* {this.state.name ? console.log(this.state.playList[0].length) : (null)} */}
                        {this.state.name ? (<h2>{this.state.name} Playlist</h2>): (null)}
                        {this.state.playList && this.state.ready ?  
                        <Fragment>
                            <AudioPlayer onEnd={this.next} audioId={this.state.playList[0][this.state.currentSong]._id} /> 
                            {this.state.context == "playlist" ?
                            <Fragment>
                                <button 
                                onClick={()=> {
                                   this.previous();
                                }}
                                >
                                    Previous
                                </button> 
                                <button 
                                    onClick={()=> {
                                        this.next();
                                    }}
                                >
                                    Next
                                </button>
                                <button 
                                    onClick={()=> {
                                        this.setState({loop: !this.state.loop})
                                    }}
                                >
                                    {this.state.loop ? "stop Loop" : "Loop All" }
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