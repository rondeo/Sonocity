import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_USER_STATUS from '../queries/getUserStatus'
import GET_CHATROOM_MESSAGE_COUNT from '../queries/getChatroomCount'
import GET_USER_NAME from '../queries/getUserData'

class ChatroomDisplay extends Component {

    state = {
        count: null,
        name: null,
        status: null,
        coverUrl:null
    };

    componentDidMount() {
        if(this.props.getName.userStationById) {
            this.setUp();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.getName.userStationById) {
            if(this.props.getName.userStationById) {
                this.setUp();
            }
        } else if (this.state.name == null) { 
            this.setUp() 
        } else if(this.props.getCount.ureadCount !== this.state.count) {
            this.updateCount();
        } else if(this.props.getStatus.userOnline !== this.state.status) {
            this.updateStatus();
        }
    }

    componentWillUnmount() {

    }

    setUp = () => {
        this.setState({
            count: this.props.getCount.ureadCount,
            status: this.props.getStatus.userOnline,
            name: this.props.getName.userStationById.name,
            coverUrl: this.props.getName.userStationById.coverUrl,
        })
    } 

    roomSelected = () => {
        this.props.roomSelected(this.props.chatroomId);
    }

    updateCount = () => {
        this.setState({
            count: this.props.getCount.ureadCount
        })
    }
    
    updateStatus = () => {
        this.setState({
            status: this.props.getStatus.userOnline
        })
    }

    render() {
        return (
            <Fragment>    
                {this.state.name ? <div onClick={this.roomSelected} className="chatRoomBloc"><img className="imgDisplayChat" src={this.state.coverUrl}/><h2>{this.state.name}</h2> {this.state.count ? <h4 className="unreadCountM">{this.state.count} <img className="messageImg" src="https://res.cloudinary.com/dkt7hv91e/image/upload/v1554776080/mail.png" /></h4> :(null)} {this.state.status ? <img className="onlineStatusC" src="https://res.cloudinary.com/dkt7hv91e/image/upload/v1554764836/1244954.png"/> : <img className="onlineStatusC" src="https://res.cloudinary.com/dkt7hv91e/image/upload/v1554764836/red-dot-clip-art_18453.png"/>}</div> :(null)}
            </Fragment>
        )
    }
}

export default compose (

graphql(GET_CHATROOM_MESSAGE_COUNT, {
    name: "getCount",
    options: {
        pollInterval: 2000
    }
}),

graphql(GET_USER_NAME, {
    name: "getName",
}),

graphql(GET_USER_STATUS, {
    name: "getStatus",
    options: {
        pollInterval: 2000
    }
}),

)(withApollo(ChatroomDisplay));