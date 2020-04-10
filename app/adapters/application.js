import DS from "ember-data";
import ENV from "../config/environment";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import { computed } from "@ember/object";

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  host: ENV.host,
  namespace: "api",
  headers: computed("session.data.authenticated.access_token", function() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers[
        "Authorization"
      ] = `Bearer ${this.session.data.authenticated.user.uid}`;
    }

    return headers;
  })
});
