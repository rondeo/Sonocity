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
        loopOne: false,
        loopAll: false,
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
            }
        }

    }

    previous = () => {
        if(parseInt(this.state.currentSong) !== 0)
            this.setState({currentSong: parseInt(this.state.currentSong) - 1,})
        else if (this.state.loopAll){
            this.setState({currentSong: this.state.playList[0].length - 1})
        }
    }
    
    handleLoop = () => {
        if(!this.state.loopOne && !this.state.loopAll){
            this.setState({loopAll: !this.state.loopAll})
        } else if (this.state.loopAll){
            this.setState({
                loopOne: !this.state.loopOne,
                loopAll: !this.state.loopAll
            }) 
        } else {
            this.setState({
                loopOne: !this.state.loopOne
            }) 
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
                            <AudioPlayer next={this.next} previous={this.previous} onEnd={this.next} audioId={this.state.playList[0][this.state.currentSong]._id} /> 
                            {this.state.context == "playlist" ?
                            <Fragment>
                                <button 
                                    onClick={()=> {
                                        this.handleLoop();
                                    }}
                                >
                                    {this.state.loopAll ? "loopOne" : (this.state.loopOne ? "stop loop" : "loop All") }
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