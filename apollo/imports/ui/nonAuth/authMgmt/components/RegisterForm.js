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
                console.log(stationId);
            }
            console.log(error);
        }
        );
        
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

export default compose (

    graphql(CREATE_STATION, {
        name: "createStation"
    }),

)(withApollo(RegisterForm));