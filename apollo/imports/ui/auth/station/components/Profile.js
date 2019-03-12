import React, { Component, Fragment } from 'react'
import { graphql, withApollo, compose } from "react-apollo";

import UPDATE_STATION_DESCRIPTION from "../queries/updateDescription"
import UPDATE_STATION_NAME from "../queries/updateName"

class Profile extends Component {
    state = {
        name: null,
        description: null,
        mDescription: false,
        mName: false
    }

    componentDidMount() {       
        this.props.name ? this.update() : (null)
    }

    componentWillUpdate(prevProps) {
        if(!this.state.name || this.props.name !== this.state.name) {
            console.log("name")
            if(this.props.name !== this.state.name || this.props.description !== this.state.description) {
                this.update();
            }
        }
    }

    update = () => {
        this.setState({
            name: this.props.name,
            description: this.props.description
        })
    }

    render() {
        return (
            <div>   
                <Fragment>
                    {!this.state.name ? (null) :
                    (<div>
                        <h1>@{this.state.name} station</h1>
                        <h4>{this.state.description}</h4>
                    </div>)
                    }
                </Fragment>       
            </div>
        )
    }
}

export default compose (
    
    graphql(UPDATE_STATION_NAME, {
        name: "updateStationName",
        options: {
            refetchQueries: ["GET_USER_STATION"]
        }
    }),
    graphql(UPDATE_STATION_DESCRIPTION, {
        name: "updateStationDescription",
        options: {
            refetchQueries: ["GET_USER_STATION"]
        }
    }),

)(withApollo(Profile));