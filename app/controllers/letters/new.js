import Controller from "@ember/controller";
import { task } from "ember-concurrency";
import { set, get } from "@ember/object";
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
      
      yield image.upload('https://api-letterman.herokuapp.com/api/upload');
      const document = this.store.createRecord('letter', {
        title: this.newtitle,
        imageUrl: image.name,
        label: this.newLabels
      });
      const newdoc = yield document.save();
      set(this, "image", "");
      set(this, "newtitle", "");
      set(this, "newLabels", []);
      window.location.href = `../letters/${newdoc.id}`;
      set(this, "loader", false);
    } catch (e) {
      this.toast.error("Something went wrong", "Error");
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
      if(!this.model.labelNames.includes(label)){
        this.model.labelNames.pushObject(label)
      }
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
