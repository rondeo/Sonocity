module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '138.197.142.241',
      username: 'gonnzo',
      pem: '/Users/geoff/Desktop/work/ivMusic/apollo/.deploy-primary/privatekey.ppk'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

 meteor: {
    // TODO: change app name and path
    name: 'Sonocity',
    path: '/Users/geoff/Desktop/work/ivMusic/apollo',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
	  PORT: 3000,
      ROOT_URL: 'https://sono.city',
      MONGO_URL: 'mongodb://localhost:27017/Sonocity',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-10.15.3-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
