import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

// import GET_CHATROOMS from './queries/getChatrooms'
import GET_USER_DATA from '../../messenger/queries/getUserData'

// import "./style/player.css"

class CommentDisplay extends Component {

    state = {
        name: null,
        content: null        
    };

    componentDidMount() {
        if(this.props.getUserData.userStationById) {
            this.processIntake();
        }
        
    }

    componentDidUpdate(prevProps) {
        if (!this.state.name || this.props.content !== prevProps.content) {
            if(this.props.getUserData.userStationById) {
                this.processIntake();
            }
        }
    }

    componentWillUnmount() {

    }

    processIntake = () => {
        this.setState({
            name: this.props.getUserData.userStationById.name,
            content: this.props.content
        })
    } 

    render() {
        return (
            <Fragment>    
                {this.state.name ? <h5 className="commentDisplayTitre">{this.state.name}</h5> : (null)}
                {this.state.content ? <h4 className="commentDisplayContenu">{this.state.content}</h4> : (null)}
            </Fragment>
        )
    }
}

export default compose (

graphql(GET_USER_DATA, {
    name: "getUserData",
}),

)(withApollo(CommentDisplay));