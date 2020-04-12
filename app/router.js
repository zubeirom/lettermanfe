import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('dashboard');
  this.route('letters', function() {
    this.route('new');
    this.route('info', {path: ':letter_id'}, function() {
      this.route('edit');
    });
  });
  this.route('labels');
  this.route('profile');
});

export default Router;
