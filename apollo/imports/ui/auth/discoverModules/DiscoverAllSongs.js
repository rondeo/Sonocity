import React, { Component, Fragment } from 'react'

import SongDisplay from './components/SongDisplay'

export default class DiscoverAllSongs extends Component {
    state = {
        processedImage: [],
        audioId: [],
        title: [],
        artist: [],
        processCompleted: false
    };

    processIntake = () => {
        this.props.data.forEach(element => {
            this.setState({
                audioId: [...this.state.audioId, element._id],
                title: [...this.state.title, element.title],
                artist: [...this.state.artist, element.artist],
            });
        });

        this.props.covers.forEach((element) => {
            let image = new Image();
            image.onload = () => {
                this.setState({processedImage: [...this.state.processedImage, image]});
            }
            image.src = 'data:'+ element.dataformat +';base64' + btoa(element.file);
        });

        this.setState({ processCompleted: true })
    }

    produceDisplay = () => {
        for (let i = 0; i < processedImage.length; i++) {
            <SongDisplay audioId={this.state.audioId[i]} title={this.state.title[i]} artist={this.state.artist[i]} image={this.state.processedImage[i]} />
        }
    }
    
    render() {
        return (
            <div>              
                <Fragment>
                    <div>
                        <h1>All Songs</h1>
                        {this.processIntake()}
                        {processCompleted ? this.produceDisplay() : (<h1>Loading</h1>)}
                    </div>  
                </Fragment>
            </div>
        )
    }
}