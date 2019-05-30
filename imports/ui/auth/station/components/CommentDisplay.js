import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_USER_DATA from '../../messenger/queries/getUserData'

class CommentDisplay extends Component {

    state = {
        name: null,
        content: null        
    };

    componentDidMount() {
        if(this.props.getUserData.userStationById) {
            this.setUp();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.getUserData.userStationById) {
            if (!this.state.name || this.props.content !== prevProps.content || this.props.getUserData.userStationById.name !== prevProps.getUserData.userStationById.name) {
                this.setUp();
            }
        }
    }

    setUp = () => {
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