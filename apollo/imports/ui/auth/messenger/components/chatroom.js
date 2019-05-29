import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_MESSAGES from '../queries/getMessages'
import SEND_MESSAGE from '../queries/sendMessage'
import SET_SEEN from '../queries/setSeen'

import MessageDisplay from './MessageDisplay'

class Chatroom extends Component {

    state = {
        messages: null,
        chatroomId: null,
        messageToSend: "",
        get: 20,
        scrolled: false

    };

    componentDidMount() {
       !this.props.getMessages.loading ? this.setUp() : (null);
    }

    componentDidUpdate(prevProps) {
        if(this.props.getMessages.messages) {
            if(this.props.chatroomId !== this.state.chatroomId) {
                this.changeRoom(); 
            } 
            if(this.state.messages) {
                if(this.props.getMessages.messages.length !== this.state.messages.length) {
                    this.updateMessages();
                }
            } else if(!this.state.messages && this.props.getMessages.messages.length > 0){
                this.updateMessages(); 
            }
        }
    }

    componentWillUnmount() {

    }

    setUp = async () => {
        await this.setState({
            chatroomId: this.props.chatroomId,
            messages: this.props.getMessages.messages
        })
        this.setToSeen();
        this.changePosition();
    } 

    updateMessages = async () => {
        await this.setState({
            messages: this.props.getMessages.messages
        })
        this.setToSeen();
        this.changePosition();
    }

    changeRoom = async () => {
        await this.setState({
            chatroomId: this.props.chatroomId
        })
        this.setToSeen();
    }

    handleMessage = e => {
        this.setState({
            messageToSend: e.target.value
        })
    }

    changePosition = () => {
        if(!this.state.scrolled){
            this.chatW.scrollTop = this.chatW.scrollHeight;
        }
    }

    handleScroll = e => {
        if(this.chatW.scrollTop < 50) {
            this.setState({get:this.state.get+=20})
        }
    }

    sendAMessage = e => {
        let reg = /.*\w.*/;
        if (e.key === 'Enter') {
            if(this.state.messageToSend.match(reg)) {
                this.props.sendMessage({
                    variables: {
                        chatroomId: this.state.chatroomId,
                        content: this.state.messageToSend,
                        timeStamp: Date.now()
                    }
                })
            }
            this.setState({
                messageToSend: ""
            })
        }
    }

    setToSeen = () => {
        this.props.setSeen({
            variables: {
                chatroomId: this.state.chatroomId
            }
        })
    }

    render() {
        return (
            <Fragment>    
                <div className="chatroomCore">
                    <div className="chatroomWindow" ref={div => (this.chatW = div)} onScroll={this.handleScroll}>
                        {this.state.messages ? !this.state.messages.length > 0 ? <div className="invitationToChat">Send a message. Start the conversation.</div> : 
                        
                            this.state.messages.map((message, i) => (
                                i > this.state.messages.length - this.state.get ?
                                <MessageDisplay key={i} message={message} /> 
                                : (null)
                            ))
                        
                        : (null)}
                    </div>
                    {/* <div className="chatroomInputContainer"> */}
                        <input className="chatroomInput" onChange={this.handleMessage} value={this.state.messageToSend} onKeyDown={this.sendAMessage} placeholder="Enter to send..."></input>   
                        {/* <button className="btnMessage"
                            onClick={()=> {
                                this.sendAMessage();
                            }}
                        >
                            Send
                        </button>                 */}
                </div>
                {/* </div> */}
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

graphql(SET_SEEN, {
    name: "setSeen",
}),

)(withApollo(Chatroom));