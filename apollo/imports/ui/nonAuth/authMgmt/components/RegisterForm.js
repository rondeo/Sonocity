import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { graphql } from "react-apollo";

import INSERT_USER_DEFAULT_DATA from "../queries/insertUserDefaultData"

class RegisterForm extends Component {
    registerUser = e => {
        e.preventDefault();
        Accounts.createUser({
            email:this.email.value,
            password:this.password.value
        },
        error => {
            if (!error) {
                this.props.client.resetStore();
            }
            console.log(error);
        }
        );
        // this.props.insertUserDefaultData({
        //     variables: {
        //         security_lvl: "1"
        //     }
        // }).catch(error => {
        //     console.log(error);
        // })
    };
    
    render(){
        return(
        <form className="form" onSubmit={this.registerUser}> 
            <input type="email" ref={input => (this.email = input)} />
            <input type="password" ref={input => (this.password = input)} />
            <button type="submit">Register User</button>
        </form>
        );    
    }
}

export default graphql(INSERT_USER_DEFAULT_DATA, {
    name: "insertUserDefaultData"
})(RegisterForm)