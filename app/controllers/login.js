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

        authFacebook() {

        },

        authLinkedin() {

        },

        invalidate() {
            this.session.invalidate();
        }
    }
});
