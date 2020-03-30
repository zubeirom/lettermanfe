import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service(),

    actions: {
        authGoogle() {
            this.session.authenticate('authenticator:google', 'google-oauth2')
            .catch(reason => {
                console.error(reason)
            })

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
