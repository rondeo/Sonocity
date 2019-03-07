import React, { Component, Fragment } from 'react';
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { compose } from 'react-apollo';

import { GET_COVER_BY_AUDIO_ID, GET_AUDIO_DATA_BY_ID } from './queries/getDataByAudioId';

class SongDisplay extends Component {    
    // state = {
    //     ready: false,
    //     image: new Image()
    // };

    // processCover = () => {
    //     this.props.covers.forEach((element) => {
    //         image.onload = () => {
    //             this.state.ready = true;
    //         }
    //         this.state.image.src = 'data:'+ element.dataformat +';base64' + btoa(this.getCoverByAudioId.file);
    //     });
    // }

    render() {
        return (
            <div>              
                <Fragment>
                    <div>
                        {this.props.getAudioDataById.loading ? (null) : ( <h5>{this.props.getAudioDataById.title} -  {this.props.getAudioDataById.artist}</h5> )}
                        {this.props.getCoverByAudioId.loading ? (null) : (<img src={'data:'+ this.props.getCoverByAudioId.dataformat +';base64' + btoa(this.props.getCoverByAudioId.file)} />)}
                    </div>  
                </Fragment>
            </div>
        )
    }
}

export default compose (
    
    graphql(GET_COVER_BY_AUDIO_ID, {
        name: "getCoverByAudioId"
    }),
    graphql(GET_AUDIO_DATA_BY_ID, {
        name: "getAudioDataById"
    }),

)(withApollo(SongDisplay));