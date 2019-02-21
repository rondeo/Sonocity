import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";

import Header from "./header/Header";

import GetUserId from "./queries/getUserId"

const App = ({ client, _id }) => {
    return (
        <div>
            <Header client={client} _id={_id} />
        </div>
    )
}

export default graphql(GetUserId, {
    props: ({ data }) => ({ ...data })
})(withApollo(App));