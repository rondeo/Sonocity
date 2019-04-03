import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

import GET_AUDIO_DATA_LIKE_TITLE from './queries/getAudioDataLikeTitle';
import GET_AUDIO_DATA_LIKE_ARTIST from './queries/getAudioDataLikeArtist';
import GET_STATION_LIKE_NAME from './queries/getStationLikeName';


import Discover from './Discover'

class Search extends Component {    

    state = {
        
    };

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps) {
        
    }

    elemSelected = (listId, i, context, name) => {
        context == "station" ? this.props.elemSelectedStation(listId, i, context, name) : this.props.elemSelectedSong(listId, i, context, name)
    }

    render() {
        return (
            <div>              
                <Fragment>
                    {this.props.getStationLikeName.loading ? (null) : ( (this.props.getStationLikeName.stationLikeName && this.props.getStationLikeName.stationLikeName.length >  0) ? (<Discover context={"station"} name={"Online stations"} idList={this.props.getStationLikeName.stationLikeName} elemSelected={this.elemSelected} />) : (<h3 className="discoverInfo">No online station matches your query</h3>))}
                    {this.props.getAudioLikeTitle.loading ? (null) : ( (this.props.getAudioLikeTitle.audioLikeTitle && this.props.getAudioLikeTitle.audioLikeTitle.length >  0) ? (<Discover context={"playlist"} name={"\""+this.props.expression+"\""+" Songs"} idList={this.props.getAudioLikeTitle.audioLikeTitle} elemSelected={this.elemSelected} />) : (<h3 className="discoverInfo">No song matches your query</h3>))}
                    {this.props.getAudioLikeArtist.loading ? (null) : ( (this.props.getAudioLikeArtist.audioLikeArtist && this.props.getAudioLikeArtist.audioLikeArtist.length >  0) ? (<Discover context={"playlist"} name={"\""+this.props.expression+"\""+" Artists"} idList={this.props.getAudioLikeArtist.audioLikeArtist} elemSelected={this.elemSelected} />) : (<h3 className="discoverInfo">No artist matches your query</h3>))}
                </Fragment>
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_STATION_LIKE_NAME, {
        name: "getStationLikeName"
    }),

    graphql(GET_AUDIO_DATA_LIKE_TITLE, {
        name: "getAudioLikeTitle"
    }),

    graphql(GET_AUDIO_DATA_LIKE_ARTIST, {
        name: "getAudioLikeArtist"
    }),

)(withApollo(Search));