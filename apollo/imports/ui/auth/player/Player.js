import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import AudioPlayer from './components/AudioPlayer'

import "./style/player.css"

export default class Player extends Component {

    state = {
        context: null,
        playList: null,
        currentSong: null,
        name: null,
        ready: false,
        loopOne: false,
        loopAll: false,
    };

    componentDidMount() {
        console.log(this.props.content)
        this.props.content ? this.processIntake() : (null)
    }

    componentDidUpdate(prevProps) {

        if(this.props.content !== null) {
            // console.log(this.props.content[0][0].length)
            if(prevProps.content == null || this.state.ready == false) {
                this.processIntake();
            } else {
                if(this.props.content[3] !== prevProps.content[3]) {
                    this.processIntake();
                }
                else if (JSON.stringify(this.props.content[0][0]) != JSON.stringify(prevProps.content[0][0]) && this.props.content[3] == prevProps.content[3] && this.props.content[0][0].length != 0){
                    this.processIntake();
                }
                else if (this.props.content[1] !== prevProps.content[1] && this.props.content[3] == prevProps.content[3]) {
                    this.processIntake();
                } 
            }
        } else {
            console.log("content is null")
        }
    }

    componentWillUnmount() {
        console.log("unmount")
    }

    changePosition = () => {

        this.props.content[2] == "playlist" ? 
        this.setState({
            currentSong: [this.props.content[1]],
            playList: this.props.content[0],

        })
        : (null)

    }

    resetPlaylist = () => {
        this.setState({playList: this.props.content[0]})
    }

    processIntake = () => {

        this.props.content[2] == "playlist" ? 
        
        this.setState({
            context: this.props.content[2],
            playList: this.props.content[0],
            currentSong: [this.props.content[1]],
            name: this.props.content[3],
            ready: true,
        })

        : (null)

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
            <div className="playerModule">              
                <Fragment>
                    <div>   
                        {this.state.name ? (<h3>{this.state.name} {this.state.context}</h3>): (null)}
                        {this.state.ready ?  
                        <Fragment>
                            {/* {this.state.playList[0][this.state.currentSong] ? */}
                            <AudioPlayer context={this.state.context} next={this.next} previous={this.previous} onEnd={this.onEnd} handleLoop={this.handleLoop} loopAll={this.state.loopAll} loopOne={this.state.loopOne}
                                audioId={this.state.context == "playlist" ? ((this.state.name == "All songs") ? this.state.playList[0][this.state.currentSong]._id : (this.state.playList[0][this.state.currentSong].audioId)) : (null)} 
                            /> 
                            {/* : (null) } */}
                        </Fragment>    
                        : (<h3>Browse our collections and select something to listen to !</h3>)} 
                    </div>  
                </Fragment>
            </div>
        )
    }
}

// export default compose (

// graphql(CLEAR_UP_NEXT, {
//     name: "clearUpNext",
// }),

// )(withApollo(Player));