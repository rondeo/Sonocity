import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPDATE_UP_NEXT from "../queries/updateUpNext"

import DisplayUpNext from "./DisplayUpNext"

class UpNextMgmt extends Component {

    state = {
        upNext: []
    }

    componentDidMount() {
        this.props.upNext.loading ? (null) : this.setUp()
    }

    componentWillUnmount() {
    }

    componentWillUpdate(prevProps) {
        if(JSON.stringify(this.props.upNext) !== JSON.stringify(prevProps.upNext) || JSON.stringify(this.props.upNext) !== JSON.stringify(this.state.upNext)) {
            this.setUp();
        } 
    }

    setUp = () => {
        this.setState({
            upNext: this.props.upNext
        })
    }

    remove = i => {
        this.setState({
            upNext: this.state.upNext.splice(i, 1)
        })
        this.props.updateUpNext({
            variables: {
                upNext: this.state.upNext
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.upNext ?
                    this.state.upNext.map((audioId, i) => (
                        i < 6 ? <DisplayUpNext key={i} index={i} onClick={this.remove} audioId={audioId} /> : (null)
                    )): (null)}
            </div>
        )
    }
}

export default compose (

    graphql(UPDATE_UP_NEXT, {
        name: "updateUpNext",
        options: {
            refetchQueries: ["GET_USER_STATION"]  
        }
    }),

)(withApollo(UpNextMgmt));
