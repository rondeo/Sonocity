import React, { Component, Fragment } from 'react'
import SettingsMenu from "./userSettings/components/settingsMenu";
import RegisterForm from "./userMgmt/RegisterForm";
import LoginForm from "./userMgmt/LoginForm"

export default class Header extends Component {
    render() {
        return (
            <div>
                { this.props._id ? (
                    <Fragment>
                    <button 
                        onClick={()=> {
                            Meteor.logout();
                            this.props.client.resetStore();
                        }}
                    >
                        Logout
                    </button>
                    <SettingsMenu />
                    </Fragment>
                ) : (
                <Fragment>
                    <RegisterForm client={this.props.client} />
                    <LoginForm client={this.props.client} />
                </Fragment>
                )}
            </div>
        )
    }
}