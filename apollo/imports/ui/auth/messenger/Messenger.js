import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_CHATROOMS from './queries/getChatrooms'
import GET_USER_STATS from '../../queries/getAuthConfirm'

import Chatroom from './components/chatroom'
import ChatroomsDisplay from './components/chatroomsDisplay'

import "./style/messenger.css"

class Messenger extends Component {

    state = {
        chatroomsList: null,
        currentChatroom: null,
        followerNumber: 0,
        followingNumber: 0
    };

    componentDidMount() {
        this.props.getChatrooms.loading || this.props.getUserStats.user.loading ? (null) : this.processIntake()
    }

    componentDidUpdate(prevProps) {        
        if(this.props.getUserStats.user && this.props.getChatrooms.chatRooms && !this.state.chatroomsList) {
            this.processIntake();
            // console.log(1)
        } else {
            if(this.props.getChatrooms.chatRooms) {
                if(this.props.getChatrooms.chatRooms.length !== prevProps.getChatrooms.chatRooms.length) {
                    this.chatroomsListUpdate();
                }
            } 
            if(this.props.getUserStats.user.follows) {
                if (this.props.getUserStats.user.follows.length !== prevProps.getUserStats.user.follows.length) {
                    this.followingUpdate();
                } 
            }
            if(this.props.getUserStats.user.followed) {
                if (this.props.getUserStats.user.followed.length !== prevProps.getUserStats.user.followed.length) {
                    this.followedUpdate();
                }
            }
        }
    }
    
    chatroomsListUpdate = () => {
        let tempList = {}
        this.props.getChatrooms.chatRooms.forEach(element => {  
            tempList[element._id] = ([element._id, (element.userId0 == Meteor.userId() ? element.userId1 : element.userId0)])
        });
        this.setState({
            chatroomsList: tempList
        })
    }

    followingUpdate = () => {
        this.props.getUserStats.user.follows ?
        this.setState({
            followingNumber: this.props.getUserStats.user.follows.length
        }) : (null)
    }

    followedUpdate = () => {
        this.props.getUserStats.user.followed ?
        this.setState({
            followerNumber: this.props.getUserStats.user.followed.length
        }) : (null)
    }

    changeRoom = chatroomId => {
        this.setState({
            currentChatroom: chatroomId
        })
    }

    processIntake = () => {
        this.chatroomsListUpdate();
        this.followedUpdate();
        this.followingUpdate();
    } 

    render() {
        return (
            <Fragment>    
                {this.state.chatroomsList ? 
                    <div className="chatCore">
                        {this.state.currentChatroom ? <Chatroom chatroomId={this.state.currentChatroom}/> : (<div><h1 className="followersNbr"><span className="followersCnt">{this.state.followerNumber}</span> <span className="followersTxt">followers</span></h1><h1 className="followingNbr"><span className="followersCnt">{this.state.followingNumber}</span> <span className="followersTxt">following</span></h1></div>)}
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
        pollInterval: 2000
    }
}),

graphql(GET_USER_STATS, {
    name: "getUserStats",
    options: {
        pollInterval: 2000
    }
}),

)(withApollo(Messenger));