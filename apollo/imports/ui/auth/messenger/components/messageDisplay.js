import React, { Component, Fragment } from 'react';
import { graphql, withApollo, compose } from "react-apollo";

class MessageDisplay extends Component {    

    state = {
        message: null,
        mine: false       
    };

    componentDidMount() {
        this.props.message ? this.processIntake() : (null)
    }

    componentDidUpdate(prevProps) {
       this.props.message.content !== prevProps.message.content ? this.processIntake() : (null)
    }

    componentWillUnmount() {

    }

    processIntake = () => {
        this.setState({
            message: this.props.message.content,
        })
        Meteor.userId() == this.props.message.senderId ? this.setState({mine:true}) : this.setState({mine:false})
    } 

    sendIndexUp = () => {

    }

    render() {
        return (
            <div>              
                <Fragment>
                    {this.state.message ? 
                        this.state.mine ? <p className="messageFromMe">{this.state.message}</p> : <p className="messageFromHe">{this.state.message}</p>
                        : (null)
                    }
                </Fragment>
            </div>
        )
    }
}

export default compose (
    

)(withApollo(MessageDisplay));