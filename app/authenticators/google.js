import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
  },

  authenticate(/*args*/) {
    console.log("triggered");
  },

  invalidate(data) {
  }
});
