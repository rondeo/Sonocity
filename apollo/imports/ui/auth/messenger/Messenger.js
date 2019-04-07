import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_CHATROOMS from './queries/getChatrooms'

import Chatroom from './components/chatroom'
import ChatroomsDisplay from './components/chatroomsDisplay'

import "./style/messenger.css"

class Messenger extends Component {

    state = {
        context: null
    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    processIntake = () => {

    } 

    render() {
        return (
            <Fragment>    
                {!this.props.getChatrooms.loading ? 
                    <div className="chatCore">
                        <Chatroom />
                        <ChatroomsDisplay/>
                    </div> 
                : (null)}
            </Fragment>
        )
    }
}

export default compose (

graphql(GET_CHATROOMS, {
    name: "getChatrooms",
}),

)(withApollo(Messenger));