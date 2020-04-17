import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({

  actions: {
    async search(searchValue) {
      try {
        if(searchValue) {
          const letters = await this.store.query('letter', {
            search: searchValue
          });
          set(this, "model", letters);
        } else {
          set(this, "model", await this.store.findAll('letter'))
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});
