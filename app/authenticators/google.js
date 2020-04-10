import Base from "ember-simple-auth/authenticators/base";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";
import RSVP from "rsvp";

export default Base.extend({
    torii: service(),
    session: service(),
    ajax: service(),

    async authenticate(provider, options) {
        try {
            const res = await this.torii.open(provider, options);
            const { authorizationCode } = res;
            const _url = `${ENV.host}/api/auth/google-auth`;

            return RSVP.Promise((resolve, reject) => {
                return this.ajax
                    .request(_url, {
                        type: "POST",
                        dataType: "json",
                        data: authorizationCode,
                        success: resolve,
                        error: reject
                    })
                    .then(response => {
                        return {
                            access_token: response.access_token
                        };
                    });
            });
        } catch (error) {
            console.error(error);
        }
    }
});
