import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  letters: DS.attr(),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),
});
