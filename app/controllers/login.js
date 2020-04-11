import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';

export default Controller.extend({
  session: service(),
  firebaseApp: service(),
  toast: service('toast'),

  checkIfAlreadyUsedEmail(code) {
    if(code === "auth/account-exists-with-different-credential") {
      this.toast.error('The Email Address is already being used by a different social provider', 'Error');
    } 
  },

  actions: {
    async authGoogle() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider).catch(e => {
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
      }
    },

    async authFacebook() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider).catch(e => {
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
      }
    },

    async authTwitter() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.TwitterAuthProvider();
        return auth.signInWithPopup(provider).catch(e => {
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
      }
    },

    async authGithub() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GithubAuthProvider();
        return auth.signInWithPopup(provider).catch(e => {
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
      }
    },

    async authMicrosoft() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        return auth.signInWithPopup(provider).catch(e => {
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
      }
    },
 
    invalidate() {
      this.session.invalidate();
    }
  }
});
