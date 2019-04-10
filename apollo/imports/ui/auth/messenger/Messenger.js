import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_CHATROOMS from './queries/getChatrooms'
import GET_USER_STATS from './queries/getUserStats'

import Chatroom from './components/chatroom'
import ChatroomsDisplay from './components/chatroomsDisplay'

import "./style/messenger.css"

class Messenger extends Component {

    state = {
        chatroomsList: null,
        currentChatroom: null,
        followerNumber: null,
        followingNumber: null
    };

    componentDidMount() {
        this.props.getChatrooms.loading || this.props.getUserStats.user.loading ? (null) : this.processIntake()
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.getChatrooms.chatRooms || !prevProps.getUserStats.user) {
            if(this.props.getChatrooms.chatRooms) {
                this.processIntake();
            }
        } else if(prevProps.getChatrooms.chatRooms && prevProps.getUserStats.user)
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
        // console.log(this.props.getUserStats)
        this.props.getChatrooms.chatRooms.forEach(element => {
            this.setState(prevState => ({
                chatroomsList:{
                  ...prevState.chatroomsList,
                  [element._id]: ([element._id, (element.userId0 == Meteor.userId() ? element.userId1 : element.userId0)])
                },
                followingNumber: this.props.getUserStats.user.follows.length,
                followerNumber: this.props.getUserStats.user.followed.length
              }));
        });
    } 

    render() {
        return (
            <Fragment>    
                {this.state.chatroomsList ? 
                    <div className="chatCore">
                        {this.state.currentChatroom ? <Chatroom chatRoom={this.state.currentChatroom}/> : (<div><h1 className="followersNbr"><span className="followersCnt">{this.state.followerNumber}</span> <span className="followersTxt">followers</span></h1><h1 className="followingNbr"><span className="followersCnt">{this.state.followingNumber}</span> <span className="followersTxt">following</span></h1></div>)}
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

graphql(GET_USER_STATS, {
    name: "getUserStats",
}),

)(withApollo(Messenger));