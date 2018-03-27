import isString from 'lodash/isString';
import isElement from 'lodash/isElement';

/**
 * View Super Class
 * @class View
 */
class View {
  /**
   * Creates an instance of View.
   * @param {any} id The ID of the View
   * @memberof View
   */
  constructor(id) {
    this.nodeId = isString(id) ? id : '';
    this.elements;
  }

  /**
   * @returns {undefined}
   * @memberof View
   */
  exists() {
    console.log('checking if exists');
    this.elements = document.querySelectorAll(`[data-id='${this.nodeId}']`);

    if (!isElement(this.elements[0])) {
      console.info(`View ${this.nodeId} Node ✖ is not present, aborting.`);
    } else {
      console.info(`View ${this.nodeId} Node ✔ is present, running class.`);
    }

    return isElement(this.elements[0]);
  }
}

export { View };
