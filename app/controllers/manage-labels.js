import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({

  actions: {
    async createLabel() {
      try {
        if(this.newLabel) {
          const newLabel = await this.store.createRecord('label', {
            name: this.newLabel
          });
          await newLabel.save();
          set(this, "newLabel", "");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteLabel(label) {
      try {
        await label.destroyRecord();
      } catch (error) {
        console.error(error);
      }
    }
  }
});
