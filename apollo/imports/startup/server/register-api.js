import { ApolloServer, gql } from 'apollo-server-express'
import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'

import typeDefs from './schema'
import resolvers from './resolvers'

import Station from '../../api/station/collections/station'
import ContextListeners from '../../api/log/collections/contextListeners'

// when server modifffffffffffffffffffffffffffffffffffffffffff

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    // id just came online
  },
  removed: function(user) {
    Station.update(
      { userId: user._id },
      { $set:
          {
              upNext: [],
              status: false
          }
       }
  );
  ContextListeners.remove({ userId: user._id });
  }
});

