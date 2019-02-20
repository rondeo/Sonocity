import React from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";
import Header from "./header/Header";

const App = () => {
    return (
        <div>
            <Header />
        </div>
    )
}

export default graphql()(App);