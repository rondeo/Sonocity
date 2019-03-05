import React from "react";
// import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";

import AuthPage from "./nonAuth/AuthPage";
import MainPage from "./auth/MainPage"

import GET_AUTH_CONFIRM from "./queries/getAuthConfirm"

const App = ({ client, authData }) => {
    if (authData.loading) return null;
    return (
        <div>
            {console.log(authData)}
            { authData.user._id ? (<MainPage client={client} id={ authData.user._id } refetch={authData.refetch} />) : (<AuthPage client={client} />)  }
            {/* <Header client={client} id={ data.user ? data.user._id : null } /> */}
        </div>
    )
}

export default graphql(GET_AUTH_CONFIRM, {
    name: "authData"
})(withApollo(App));