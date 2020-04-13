import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { set } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {

  async afterModel(model) {
    set(model, "newLabels", model.label);
    const labels = await this.store.findAll('label');
    set(model, "labels", []);
    labels.forEach(label => {
      model.labels.pushObject(label.name);
    });
  }
});
