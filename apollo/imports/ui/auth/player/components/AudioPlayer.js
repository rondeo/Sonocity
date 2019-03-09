import React, { Component, Fragment } from 'react'
import ReactHowler from 'react-howler'
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_LINK_BY_ID from '../queries/getAudioLinkById'
import INSERT_LH_LOG from '../queries/insertIntoLogHistory'
import Slider from '@material-ui/lab/Slider';

class AudioPlayer extends Component {

    state = {
        play: true,
    }

    componentDidMount() {
      
        this.props.audioId.loading ? (null) : 
        this.props.insertIntoLogHistory({
            variables: {
                audioId: this.props.audioId
            }
        });

    }

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // (console.log("update"))
        if (this.props.audioId != prevProps.audioId){
            this.props.getAudioLinkById.refetch();

            const dataresult = this.props.insertIntoLogHistory({
                variables: {
                    audioId: this.props.audioId
                }
            });

            // insert into station upNext
        }
    }

    getHower = () => {
        this.player.howler
    }
     
    getDuration = () => {
        this.player.duration()
    }
     
    getSeek = () => {
        this.player.seek()
    }
     
    setSeek = () => {
        this.player.seek(0.5)
    }

    onEnd = () => {
        this.props.onEnd();
    }

    pause = () => {
        this.player.pause();
    }

    play = () => {
        this.player.play();
    }

  render () {
    return (
        <div>
            <Fragment>
        {this.props.getAudioLinkById.loading ?
       (null)
       :
       (<Fragment>
       <h3>Currently Playing : </h3>
       <h3>{this.props.getAudioLinkById.audioData.title} by {this.props.getAudioLinkById.audioData.artist}</h3>
       <button 
            onClick={()=> {
                this.state.play ? this.pause() : this.play()
                this.setState({play: !this.state.play})
            }}
        >
            {this.state.play ? "Pause" : "Play" }
        </button> 
       <ReactHowler
        src={this.props.getAudioLinkById.audioData.fileUrl}
        playing={this.state.play}
        html5={true}
        onEnd={this.onEnd}
        ref={(ref) => (this.player = ref)}
        />
      </Fragment>)
      
      } 
      </Fragment>
      </div>
    )
  }
}


export default compose (
    
    graphql(GET_AUDIO_LINK_BY_ID, {
        name: "getAudioLinkById"
    }),

    graphql(INSERT_LH_LOG, {
        name: "insertIntoLogHistory"
    }),

)(withApollo(AudioPlayer));