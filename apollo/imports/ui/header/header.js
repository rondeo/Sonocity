import React, { Component, Fragment } from 'react'

import SettingsMenu from "./userSettings/components/SettingsMenu";
import RegisterForm from "./userMgmt/components/RegisterForm";
import LoginForm from "./userMgmt/components/LoginForm"

export default class Header extends Component {
    render() {
        return (
            <div>
                { this.props.id ? (
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