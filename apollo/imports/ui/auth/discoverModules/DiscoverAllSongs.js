import React, { Component, Fragment } from 'react'
import SongDisplay from './components/SongDisplay'
import "./style/discoverAllSongs.css"


export default class DiscoverAllSongs extends Component {
    state = {
        audioId: []
    };

    componentDidMount() {
        this.processIntake();  
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        (console.log("update"))
        if (this.props.audio.length !== prevProps.audio.length) {
            this.processIntake();  
        }
    }

    processIntake = () => {
        this.setState({
            audioId: [this.props.audio]
        });  
    } 
    
    songSelected = i => {
        this.props.songSelected(this.state.audioId, parseInt(i));
    }
    
    render() {
        return (
            <div>              
                <Fragment>
                    <div>
                        <h1 className = "allSongs">All Songs</h1>
                        <div className="snippets">
                            {this.state.audioId[0] ?
                                this.state.audioId[0].map((audioId, i) => (
                                    <SongDisplay key={i} index={i} onClick={this.songSelected} audioId={audioId._id} />
                            )) : (null) }
                        </div>             
                    </div>  
                </Fragment>
            </div>
        )
    }
}