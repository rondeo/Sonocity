import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_CHATROOMS from './queries/getChatrooms'

import Chatroom from './components/chatroom'
import ChatroomsDisplay from './components/chatroomsDisplay'

import "./style/messenger.css"

class Messenger extends Component {

    state = {
        chatroomsList: null,
        currentChatroom: null
    };

    componentDidMount() {
        this.props.getChatrooms.loading ? (null) : this.processIntake()
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.getChatrooms.chatRooms) {
            if(this.props.getChatrooms.chatRooms) {
                this.processIntake();
            }
        } else if(prevProps.getChatrooms.chatRooms)
            if(this.props.getChatrooms.chatRooms.length !== prevProps.getChatrooms.chatRooms.length) {
                this.processIntake();
        }
    }

    componentWillUnmount() {

    }

    changeRoom = chatroomId => {
        this.setState({
            currentChatroom: this.state.chatroomsList[chatroomId]
        })
    }

    processIntake = () => {
        this.props.getChatrooms.chatRooms.forEach(element => {
            this.setState(prevState => ({
                chatroomsList:{
                  ...prevState.chatroomsList,
                  [element._id]: ([element._id, (element.userId0 == Meteor.userId() ? element.userId1 : element.userId0)])
                }
              }));
        });
    } 

    render() {
        return (
            <Fragment>    
                {this.state.chatroomsList ? 
                    <div className="chatCore">
                        {this.state.currentChatroom ? <Chatroom chatRoom={this.state.currentChatroom}/> : (null)}
                        <div className="chatroomListContainer"> 
                            {   
                                Object.keys(this.state.chatroomsList).map((key) => (
                                <ChatroomsDisplay key={key} roomSelected={this.changeRoom} userId={this.state.chatroomsList[key][1]} chatroomId={this.state.chatroomsList[key][0]} />   
                            ))}
                       </div>
                    </div> 
                : (<h3 className="discoverInfo">You have no mutuals</h3>)}
            </Fragment>
        )
    }
}

export default compose (

graphql(GET_CHATROOMS, {
    name: "getChatrooms",
    options: {
        pollInterval: 30000
    }
}),

)(withApollo(Messenger));