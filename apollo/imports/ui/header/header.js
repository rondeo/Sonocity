import React, { Component } from "react";
import SettingsMenu from "./userSettings/components/settingsMenu";
import RegisterForm from "./userMgmt/RegisterForm";
import LoginForm from "./userMgmt/LoginForm"

export default class Header extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>Meteor.logout()}>Logout</button>
                <RegisterForm />
                <LoginForm />
                <SettingsMenu />
            </div>
        )
    }
}