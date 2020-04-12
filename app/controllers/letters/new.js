import Controller from "@ember/controller";
import { task } from "ember-concurrency";
import { set, get } from "@ember/object";
import ENV from "lettermanfe/config/environment";
import { inject as service } from '@ember/service';

export default Controller.extend({
  toast: service(),
  session: service(),
  router: service(),
	
  init() {
    this._super(...arguments);
    this.image = "";
    this.labels = [{ name: "bitch" }, { name: "fuck" }, { name: "you" }];
  },

  sendToServer: task(function* (image) {
    set(this, "loader", true);
		
    set(image, "name", image.id + "." + image.extension);

    try {
      yield image.upload(`${ENV.host}/api/upload`);
      const document = this.store.createRecord('letter', {
        title: this.newtitle,
        imageUrl: image.name,
        label: ["foo", "bar"]
      });
      const newdoc = yield document.save();
      this.router.transitionTo('letters.info', newdoc);
      set(this, "loader", false);
    } catch (e) {
      set(this, "loader", false);
      console.error(e);
    }
  })
    .maxConcurrency(3)
    .enqueue(),

  actions: {
    uploadImage(image) {
      try {
        set(this, "load", true);
        set(this, "image", image);
        set(this, "load", false);
      } catch (error) {
        set(this, "load", false);
        console.error(error);
      }
    },

    addLabel(selected) {
      console.log(selected);
    },

    save() {
      try {
        set(this, "loader", true);
        if(this.image) {
          get(this, 'sendToServer').perform(this.image);
        } else {
          this.toast.error("Please upload a document", "Error");
          set(this, "loader", false);
        }
      } catch (error) {
        set(this, "loader", false);
        console.error(error)
      }
    },
  },
});
