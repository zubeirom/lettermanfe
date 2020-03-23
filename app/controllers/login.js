import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    session: service(),

    actions: {
        authGoogle() {
            this.session.authenticate('authenticator:google', {})
            .catch(reason => {
                set('errorMessage', reason.error || reason);
            })
        },

        authFacebook() {

        },

        authLinkedin() {

        }
    }
});
