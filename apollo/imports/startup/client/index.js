import React from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { MeteorAccountsLink } from 'meteor/apollo'

import App from '../../ui/App'

const client = new ApolloClient({
    link: ApolloLink.from([
      new MeteorAccountsLink(),
      new HttpLink({
        uri: '/graphql'
      })
    ]),
    cache: new InMemoryCache()
  })

const ApolloApp = () => (
    <AppoloProvider client={client}>
        <App />
    </AppoloProvider>
)

Meteor.startup(() => {
    render(<ApolloApp />, document.getElementById('app'));
});