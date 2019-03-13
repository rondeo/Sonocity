import React, { Component, Fragment } from 'react'
import ReactHowler from 'react-howler'
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_LINK_BY_ID from '../queries/getAudioLinkById'
import INSERT_LH_LOG from '../queries/insertIntoLogHistory'
import INSERT_LIKED_AUDIO from '../queries/insertLikedAudio'
import IS_AUDIO_LIKED from '../queries/isAudioLiked'
import REMOVE_LIKED_AUDIO from '../queries/removeLikedAudio'
import LIKED_COUNT from '../queries/likedCount'
import LISTEN_COUNT from '../queries/listenCount'

import Seeker from './Seeker'

import "../style/audioPlayer.css";

class AudioPlayer extends Component {

    state = {
        play: false,
        liked: null
    }

    componentDidMount() {
        this.props.audioId.loading ? (null) : 
        (this.setState({play:true}))
    }

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
        if (this.props.audioId != prevProps.audioId){
            this.props.getAudioLinkById.refetch();
            this.props.isAudioLiked.refetch();
            this.setState({liked:null})

            // insert into station upNext
        }
    }

    componentWillUnmount() {
        // delete this.player;
        // console.log("delete")
    }

    componentDidCatch(error, errorInfo) {
        console.log(error)
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
     
    setSeek = e => {
        this.player.seek(e)
    }

    onEnd = () => {
        {this.props.audioId.loading ? (null) : this.insertIntoLogHistory()}
        this.props.onEnd();
    }

    pause = () => {
        this.player.pause();
    }

    play = () => {
        this.player.play();
    }

    previous = () => {
        const seek = this.getSeek();
        if(seek<2){
            this.props.previous();
        } else {
            this.setSeek(0);
        }
    }

    insertIntoLogHistory = () => {
        this.props.insertIntoLogHistory({
            variables: {
                audioId: this.props.audioId
            }
        });
    }

    addLiked = () => {
        const like = this.props.insertLikedAudio({
            variables: {
                audioId: this.props.audioId
            }
        });
    }

    removeLiked = () => {
        this.props.removeLikedAudio({
            variables: {
                audioId: this.props.audioId
            }
        });
    }

    likedChange = () => {
        if(this.state.liked == null){
            if(!this.props.isAudioLiked.isAudioLiked){
                this.addLiked();
                this.setState({liked: true})
            } else {
                this.removeLiked();
                this.setState({liked: false})
            }
        } else {
            if(this.state.liked){
                this.removeLiked();
                this.setState({liked: false})
            } else {
                this.addLiked();
                this.setState({liked: true})
            }
        }
    }

    handlePlayPause = () => {
        this.state.play ? this.pause() : this.play()
        this.setState({play: !this.state.play})
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

       <ReactHowler
        src={this.props.getAudioLinkById.audioData.fileUrl}
        playing={this.state.play}
        html5={true}
        onEnd={this.onEnd}
        ref={(ref) => (this.player = ref)}
        />
         
        <Seeker play={this.state.play} seek={this.getSeek} info={this.getDuration} setSeek={this.setSeek}/>
          
        <div className="audioPlayerButtons">

        <button 
            onClick={()=> {
                this.props.handleLoop();
            }}
        >
            {this.props.loopAll ? "loopOne" : (this.props.loopOne ? "stop loop" : "loop All") }
        </button>
       <button 
            onClick={()=> {
                this.previous();
            }}
            >
                Previous
        </button> 
       <button 
            onClick={()=> {
                this.handlePlayPause();
            }}
        >
            {this.state.play ? "Pause" : "Play" }
        </button> 
        <button 
            onClick={()=> {
                this.props.next();
            }}
        >
            Next
        </button>
        {this.props.isAudioLiked.loading ?
        (null)
        :
        (<button 
            onClick={()=> {
                this.likedChange();
            }}
        >
            {(this.props.isAudioLiked.isAudioLiked && this.state.liked == null) ? "UnLike" : (this.state.liked ? "UnLike" : "Like") }
        </button>)
        }

        </div>

        <div>
        {this.props.likedCount.loading ? (null) : (<p>{this.props.likedCount.audioLikedCount} likes</p>)}
        {this.props.listenCount.loading ? (null) : (<p>{this.props.listenCount.audioListenCount} plays</p>)}

        </div>

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
        name: "insertIntoLogHistory",
        options: {
            refetchQueries: ["LISTEN_COUNT"]
        }
    }),

    graphql(IS_AUDIO_LIKED, {
        name: "isAudioLiked"
    }),

    graphql(LIKED_COUNT, {
        name: "likedCount"
    }),

    graphql(LISTEN_COUNT, {
        name: "listenCount"
    }),

    graphql(INSERT_LIKED_AUDIO, {
        name: "insertLikedAudio",
        options: {
            refetchQueries: ["GET_USER_LIKED_AUDIO", "LIKED_COUNT"]
        }
    }),

    graphql(REMOVE_LIKED_AUDIO, {
        name: "removeLikedAudio",
        options: {
            refetchQueries: ["GET_USER_LIKED_AUDIO", "LIKED_COUNT"]
        }
    }),

)(withApollo(AudioPlayer));