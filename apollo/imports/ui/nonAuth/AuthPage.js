import React, { Component, Fragment } from 'react'

import RegisterForm from "./authMgmt/components/RegisterForm";
import LoginForm from "./authMgmt/components/LoginForm"

import "./style/unauth.css"



export default class AuthPage extends Component {
   
    state = {
        error: null
    }
    
    showErrors = error => {
        this.setState({
            error: error
        })
    }

    render() {
        return (
            <div>              
                <Fragment>
                <div className="header">
                </div>
                    <div className="unauthContent">
                        {/* <h1>Become a force in the musical world</h1>
                        <p>One of the major features developed for the platform will allow users who have 
                            defined a certain scope to listen to them "connect" to the "feed" of other users 
                            and listen live audio content they are consuming or to produce. The current content delivery model 
                            for the majority of streaming platforms is built around the station idea. Stations are points of 
                            distribution of audio content of the platform (playlist) which are built in various ways 
                            (user-based, traffic-based, expert-based, context-based). In the case of our application, 
                            the broadcasting structure will be such that each user will himself be a station / a point of streaming. 
                            Each user who wants it (option to broadcast or not with different degree of confidentiality) will have 
                            the opportunity to broadcast his station live and allow other users to "plug". Depending on the privacy 
                            settings of users, different types of connections will be available between stations, a public station could be 
                            followed by a large number of people who will have direct access to the station, while a private station 
                            could be accessible only by users with whom it has a two-way relationship. Two users with a bidirectional 
                            follow-up relationship will be able to communicate via instantaneous chat.
                        </p>
                        <h3>Share / Discover / Connect</h3> */}
                    <div className="logo"></div>

                    <h2>flash-authentification</h2>   
                        <div className="unauthCore">
                
                            <RegisterForm showE={this.showErrors} client={this.props.client} />
                        {/* <h2>or</h2> */}
                            <LoginForm showE={this.showErrors} client={this.props.client} />
                        </div>
                        {this.state.error ? <h2>Authentification error</h2> : (null) }
                    </div>

                </Fragment>
            </div>
        )
    }
}