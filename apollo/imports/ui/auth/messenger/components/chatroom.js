import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

// import GET_CHATROOMS from './queries/getChatrooms'

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
                <div className="messengerCore"></div>
            </Fragment>
        )
    }
}

export default compose (

// graphql(GET_CHATROOMS, {
//     name: "getChatrooms",
// }),

)(withApollo(Chatroom));