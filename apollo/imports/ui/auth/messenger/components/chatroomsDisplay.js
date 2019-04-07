import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

// import GET_CHATROOMS from './queries/getChatrooms'

// import "./style/player.css"

class ChatroomDisplay extends Component {

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
                
            </Fragment>
        )
    }
}

export default compose (

// graphql(GET_CHATROOMS, {
//     name: "getChatrooms",
// }),

)(withApollo(ChatroomDisplay));