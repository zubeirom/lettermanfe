import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from "../config/environment";
import firebase from 'firebase/app';
import { set } from '@ember/object';

export default Controller.extend({
  session: service(),
  firebaseApp: service(),
  toast: service('toast'),

  actions: {
    invalidate() {
      this.session.invalidate();
    },

    async deleteAccount() {
      try {
        set(this, "activeDelete", true)
        await fetch(`${ENV.host}/api/accounts/delete`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.session.data.authenticated.user.uid}`
          }
        });
        this.get("firebaseApp").auth().then(({currentUser}) => {
          const {providerId} = currentUser.providerData[0];
          const provider = new firebase.auth.OAuthProvider(providerId);
          currentUser.reauthenticateWithPopup(provider).then(() => {
            currentUser.delete().then(() => {
              document.location.reload();
            }).catch(e => {
              this.toast.error("Something went wrong!", "Error");
              set(this, "activeDelete", false)
              throw e;
            })
          }).catch(e => {
            this.toast.error("Something went wrong!", "Error");
            set(this, "activeDelete", false)
            throw e;
          });
        })
      } catch (error) {
        this.toast.error("Something went wrong!", "Error");
        set(this, "activeDelete", false)
        throw error;
      }
    }
  }
});
