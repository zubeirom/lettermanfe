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
    this.newLabels = [];
  },

  ifExists(name) {
    return this.newLabels.includes(name);
  },

  sendToServer: task(function* (image) {
    set(this, "loader", true);
		
    set(image, "name", image.id + "." + image.extension);

    try {
      yield image.upload(`${ENV.host}/api/upload`);
      const document = this.store.createRecord('letter', {
        title: this.newtitle,
        imageUrl: image.name,
        label: this.newLabels
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
    addLabel(label) {
      if(!this.ifExists(label)) {
        this.newLabels.pushObject(label);
        this.model.labelNames.removeObject(label);
      }
    },

    removeLabel(label) {
      this.newLabels.removeObject(label);
      this.model.labelNames.pushObject(label)
    },

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

    save() {
      try {
        set(this, "loader", true);
        if(this.image && this.newtitle) {
          get(this, 'sendToServer').perform(this.image);
        } else {
          this.toast.error("Please make sure a document and the title is ready", "Error");
          set(this, "loader", false);
        }
      } catch (error) {
        set(this, "loader", false);
        console.error(error)
      }
    },
  },
});
