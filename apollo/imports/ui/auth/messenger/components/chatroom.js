import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_MESSAGES from '../queries/getMessages'
import SEND_MESSAGE from '../queries/sendMessage'

class Chatroom extends Component {

    state = {
        messages: null
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
                <div className="chatroomCore">
                    <div className="chatroomWindow"></div>
                    <div className="chatroomInput"></div>
                </div>
            </Fragment>
        )
    }
}

export default compose (

graphql(GET_MESSAGES, {
    name: "getMessages",
    options: {
        pollInterval: 500
    }
}),

graphql(SEND_MESSAGE, {
    name: "sendMessage",
}),

)(withApollo(Chatroom));