import { StringConstants } from "./StringConstants";

class UrlConstants extends StringConstants {
  tripsViewPath = "/trips";
  addTripViewPath = `${this.tripsViewPath}/add`;
  editTripViewPath = `${this.tripsViewPath}/edit`;
  viewTripViewPath = `${this.tripsViewPath}/view`;
}

let urls = new UrlConstants();
export default urls;
