import React, { Component, Fragment } from 'react'

import Display from './components/coverWithId'

export default class DiscoverAllSongs extends Component {
    render() {
        return (
            <div>              
                <Fragment>
                    <div>
                        <h1>All Songs</h1>
                        {this.props.covers.forEach(element => {
                            <Display id={element.audioId} image={element.file} />
                        })}
                    </div>  
                </Fragment>
            </div>
        )
    }
}