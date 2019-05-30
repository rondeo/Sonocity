import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { graphql, withApollo, compose } from "react-apollo";

import CREATE_STATION from "../queries/createStation"

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
                const stationId = this.props.createStation({});
            }
            else {this.props.showE(error);}
        }
        );
        
    };
    
    render(){
        return(
        <form className="form" onSubmit={this.registerUser}> 
            <label>Email:</label>
            <input type="email" ref={input => (this.email = input)} />
            <label>Password:</label>
            <input type="password" ref={input => (this.password = input)} />
            <button className="unauthB" type="submit">Register</button>
        </form>
        );    
    }
}

export default compose (

    graphql(CREATE_STATION, {
        name: "createStation"
    }),

)(withApollo(RegisterForm));