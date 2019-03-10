import React, { Component, Fragment } from 'react'
import ReactHowler from 'react-howler'
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_LINK_BY_ID from '../queries/getAudioLinkById'
import INSERT_LH_LOG from '../queries/insertIntoLogHistory'

import Seeker from './Seeker'

class AudioPlayer extends Component {

    state = {
        play: false,
    }

    componentDidMount() {
      
        this.props.audioId.loading ? (null) : 
        (this.setState({play:true}))

        this.props.insertIntoLogHistory({
            variables: {
                audioId: this.props.audioId
            }
        });

    }

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
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

    componentWillUnmount() {
        // delete this.player;
        // console.log("delete")
    }

    lookAtChange = () => {

    }

    getHower = () => {
        this.player.howler
    }
     
    getDuration = () => {
        return this.player.duration();
    }
     
    getSeek = () => {
        return this.player.seek();
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
        {/* <Seeker play={this.state.play} seek={this.getSeek} info={this.getDuration()}/> */}
        
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