import DS from "ember-data";
const { Model } = DS;

export default Model.extend({
  title: DS.attr(),
  content: DS.attr(),
  imageUrl: DS.attr(),
  label: DS.attr(),
  createdAt: DS.attr(),
  updateAt: DS.attr()
});
