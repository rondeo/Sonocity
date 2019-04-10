import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_MESSAGES from '../queries/getMessages'

// import "./style/player.css"

class Chatroom extends Component {

    state = {

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
                {/* <div className="messengerCore"></div> */}
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

)(withApollo(Chatroom));