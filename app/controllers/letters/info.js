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
      if(!this.model.labels.includes(label)) {
        this.model.labels.pushObject(label) 
      }
    },

    async delete() {
      try {
        await this.model.destroyRecord();
        this.toast.success("Document successfully deleted", "Great!");
        set(this, "editMode", false);
        set(this, "deleteMode", false);
        this.transitionToRoute('dashboard');
      } catch (error) {
        console.error();
      }
    },

    redirect() {
      set(this, "editMode", false);
      set(this, "deleteMode", false);
      this.transitionToRoute("dashboard")
    },

    save() {
      set(this.model, "label", this.model.newLabels);
      try {
        if(this.model.title) {
          this.model.save();
          set(this, "editMode", false);
          this.toast.success("Changes are saved", "Great!");
        } else {
          this.toast.error("Title has to be defined", "Error")
        }
      } catch (error) {
        this.toast.error("Something went wrong", "Error");
        console.error(error)
      }
    }
  }
});
