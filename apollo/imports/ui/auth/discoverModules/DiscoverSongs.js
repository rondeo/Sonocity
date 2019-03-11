import React, { Component, Fragment } from 'react'
import SongDisplay from './components/SongDisplay'
import "./style/discoverSongs.css"


export default class Discover extends Component {
    state = {
        audioId: [],
        name: null,
        context: "playlist"
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
            audioId: [this.props.audio],
            name: this.props.name
        });  
    } 
    
    songSelected = i => {
        {console.log(i)}
        this.props.songSelected(this.state.audioId, parseInt(i), this.state.context, this.state.name);
    }
    
    render() {
        return (
            <div>              
                <Fragment>
                    <div>
                        {this.props.name.loading ? (null) : (<h1 className = "dName">{this.props.name}</h1>)}
                        <div className="snippets">
                            {this.state.audioId[0] ?
                                this.state.audioId[0].map((audioId, i) => (
                                    <SongDisplay key={i} index={i} onClick={this.songSelected} audioId={this.state.name == "All songs" ? audioId._id : audioId.audioId} />
                            )) : (null) }
                        </div>        
                        {console.log(this.state.audioId)}     
                    </div>  
                </Fragment>
            </div>
        )
    }
}