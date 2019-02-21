import React from "react";
// import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";

import Header from "./header/Header";

import GET_USER_ID from "./queries/getUserId"

const App = ({ client, data }) => {
    if (data.loading) return null;
    return (
        <div>
            {console.log(data)}
            <Header client={client} id={ data.user ? data.user._id : null } />
        </div>
    )
}

export default graphql(GET_USER_ID)(withApollo(App));