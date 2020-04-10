import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';

export default Controller.extend({
  session: service(),
  firebaseApp: service(),

  actions: {
    async authGoogle() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
      console.log(this.session)
    },

    async authFacebook() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
      console.log(this.session)
    },

    async authTwitter() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.TwitterAuthProvider();
        return auth.signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
      console.log(this.session)
    },

    async authGithub() {
      try {
        const auth = await this.get('firebaseApp').auth();
        const provider = new firebase.auth.GithubAuthProvider();
        return auth.signInWithPopup(provider).catch(e => {
          console.log(e.code);
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
          console.log(e.code);
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
