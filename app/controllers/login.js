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
    } else {
      this.toast.error('Something went wrong', 'Error');
    }
  },

  actions: {
    async authGoogle() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider).then(() => {
          document.location.reload();
        }).catch(e => {
          console.error(e);
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        console.error(error);
        this.toast.error('Something went wrong', 'Error');
      }
    },

    async authFacebook() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider).then(() => {
          document.location.reload();
        }).catch(e => {
          console.error(e);
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        this.toast.error('Something went wrong', 'Error');
        console.error(error);
      }
    },

    async authTwitter() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.TwitterAuthProvider();
        return auth.signInWithPopup(provider).then(() => {
          document.location.reload();
        }).catch(e => {
          console.error(e);
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        this.toast.error('Something went wrong', 'Error');
        console.error(error);
      }
    },

    async authGithub() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GithubAuthProvider();
        return auth.signInWithPopup(provider).then(() => {
          document.location.reload();
        }).catch(e => {
          console.error(e);
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        this.toast.error('Something went wrong', 'Error');
        console.error(error);
      }
    },

    async authMicrosoft() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        return auth.signInWithPopup(provider).then(() => {
          document.location.reload();
        }).catch(e => {
          console.error(e);
          this.checkIfAlreadyUsedEmail(e.code)
        });
      } catch (error) {
        this.toast.error('Something went wrong', 'Error');
        console.error(error);
      }
    },
 
    invalidate() {
      this.session.invalidate();
    }
  }
});
