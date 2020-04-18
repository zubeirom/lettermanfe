'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'lettermanfe',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      providers: {
        sessionServiceName: 'session',
        'google-oauth2': {
          apiKey: process.env.G_CLIENT_ID,
          redirectUri: 'http://localhost:4200/torii/redirect.html',
          scope: 'https://www.googleapis.com/auth/userinfo.email'
        }
      }
    },

    firebase: {
      apiKey: process.env.FIREBASE_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PID
    }
  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: '/dashboard'
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.host = "http://localhost:3000";
    ENV.client = 'http://localhost:4200';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.host = "https://letterman-api.azurewebsites.net";
    // here you can enable a production-specific feature
  }
  return ENV;
};
