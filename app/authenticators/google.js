import Base from "ember-simple-auth/authenticators/base";
import { isEmpty } from "@ember/utils";
import axios from "axios";
import ENV from "../config/environment";


export default Base.extend({
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  async authenticate(/*args*/) {
    console.log("triggered");
    
    const payload = await axios.get(`${ENV.host}/api/auth/google-url`);
    const { data } = payload;
    window.open(data);
  },

  invalidate(data) {
    return Promise.resolve(data);
  }
});