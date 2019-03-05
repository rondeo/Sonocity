import React, { Component, Fragment } from 'react'

import SettingsMenu from './userSettings/components/SettingsMenu'
import UploadModule from './uploadModule/UploadModule'

export default class MainPage extends Component {
    state = {
        upload: false,
    };

    render() {
        return (
            <div>     
                <Fragment>
                <button 
                    onClick={()=> {
                        Meteor.logout();
                        this.props.client.resetStore();
                    }}
                >
                    Logout
                </button>

                <button 
                    onClick={()=> {
                        this.setState({upload: !this.state.upload})
                    }}
                >
                    {this.state.upload ? "Close" : "Upload" }
                </button> 

                {this.state.upload ? (<UploadModule id={this.props.id} />) : (null) }
                
                {/* <SettingsMenu /> */}
                </Fragment>       
            </div>
        )
    }
}