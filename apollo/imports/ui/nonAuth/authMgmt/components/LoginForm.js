import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import "../style/loginForm.css"

export default class LoginForm extends Component {
    login = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(this.email.value, this.password.value,
        error => {
            console.log(error);
            if (!error) {
                this.props.client.resetStore();
            }
        }
        );
    };
    
    render(){
        return(
        <form className="form" onSubmit={this.login}> 
            <label>Email:</label>
            <input type="email" ref={input => (this.email = input)} />
            <label>Password:</label>
            <input type="password" ref={input => (this.password = input)} />
            <button className="unauthB" type="submit">Login</button>
        </form>
        );    
    }
}
