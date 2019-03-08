import React from "react";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { MeteorAccountsLink } from 'meteor/apollo'
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
 
const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

import App from '../../ui/App'

const client = new ApolloClient({
    link: ApolloLink.from([
      errorlink,
      new MeteorAccountsLink(),
      new HttpLink({
        uri: '/graphql'
      })
    ]),
    cache: new InMemoryCache()
  })

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

Meteor.startup(() => {
  // if (Meteor.isServer) {
  //     Meteor.publish('files.audioFile.all', function () {
  //     return AudioFile.collection.find({});
  //   });
  // }
 
  // if (Meteor.isClient) {
  //   Meteor.subscribe('files.audioFile.all');
  // }
  
  render(<ApolloApp />, document.getElementById('app'));  
});

