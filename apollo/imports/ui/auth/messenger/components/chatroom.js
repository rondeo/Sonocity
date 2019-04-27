import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_MESSAGES from '../queries/getMessages'
import SEND_MESSAGE from '../queries/sendMessage'
import SET_SEEN from '../queries/setSeen'

class Chatroom extends Component {

    state = {
        messages: null,
        chatroomId: null,
        messageToSend: null
    };

    componentDidMount() {
       !this.props.getMessages.loading ? this.processIntake() : (null);
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

    processIntake = async () => {
        await this.setState({
            chatroomId: this.props.chatroomId,
            messages: this.props.getMessages.messages
        })
        this.setToSeen();
    } 

    updateMessages = async () => {
        await this.setState({
            messages: this.props.getMessages.messages
        })
        this.setToSeen();
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
                    <div className="chatroomWindow"></div>
                        {console.log(this.state.messages)}
                    <div className="chatroomInputContainer">
                        <input className="chatroomInput" onChange={this.handleMessage}  onKeyDown={this.sendAMessage} placeholder="Enter to send..."></input>   
                        {/* <button className="btnMessage"
                            onClick={()=> {
                                this.sendAMessage();
                            }}
                        >
                            Send
                        </button>                 */}
                    </div>
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

graphql(SET_SEEN, {
    name: "setSeen",
}),

)(withApollo(Chatroom));