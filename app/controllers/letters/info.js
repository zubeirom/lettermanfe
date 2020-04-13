import Controller from '@ember/controller';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  toast: service('toast'),

  ifExists(name) {
    return this.model.newLabels.includes(name);
  },

  actions: {
    addLabel(label) {
      if(!this.ifExists(label)) {
        this.model.newLabels.pushObject(label);
        this.model.labels.removeObject(label);
      }
    },

    removeLabel(label) {
      this.model.newLabels.removeObject(label);
      this.model.labels.pushObject(label)
    },

    save() {
      set(this.model, "label", this.model.newLabels);
      try {
        if(this.model.title) {
          this.model.save();
          set(this, "editMode", false);
        } else {
          this.toast.error("Title has to be defined", "Error")
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
});
