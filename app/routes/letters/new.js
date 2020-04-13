import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import { set } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll("label");
  },

  afterModel(model) {
    set(model, "labelNames", []);
    model.forEach(label => {
      model.labelNames.pushObject(label.name);
    });
  }
});
