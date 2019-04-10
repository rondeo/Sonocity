import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import GET_STATION_COMMENTS from '../queries/getStationComment'

import CommentDisplay from './CommentDisplay'

// import "./style/player.css"

class StationComments extends Component {

    state = {
        comments: null
    };

    componentDidMount() {
        this.props.getStationComments.loading ? (null) : this.processIntake();
    }

    componentDidUpdate(prevProps) {
        if (this.props.getStationComments.stationComment) {
            if(this.state.comments == null) {
                this.processIntake();
            } else {
                if (this.props.getStationComments.stationComment.length !== this.state.comments.length) {
                    this.processIntake();
                } 
                else if(this.state.comments.length === 50) {
                    if(this.props.getStationComments.stationComment[49].timeStamp !== this.state.comments[49].timeStamp) {
                        this.processIntake();
                    }
                }
            }
        }
    }

    commentsUpdate = () => {
        
    }

    componentWillUnmount() {

    }

    processIntake = () => {
        this.setState({
            comments: this.props.getStationComments.stationComment
        })
    } 

    render() {
        return (
            <Fragment>   
                <div className="stationCommentList"> 
                    {this.state.comments ? (this.state.comments.map((comment, i) => (<CommentDisplay key={i} userId={comment.userId} content={comment.content} timeStamp={comment.timeStamp} />))) : (<h3>None</h3>)}
               </div>
            </Fragment>
        )
    }
}



export default compose (

graphql(GET_STATION_COMMENTS, {
    name: "getStationComments",
    options: {
        pollInterval: 500
    }
}),

)(withApollo(StationComments));