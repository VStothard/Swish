/**
 * @class Device
 */
class Device {
  constructor () {
    /** @type {string} The userAgent of the device */
    this.userAgent = navigator.userAgent;

    /** @type {RegExp} Regex for mobile device OSs */
    this.mobileRegEx = /iPhone|iPad|iPod|Android/i;
  }

  /**
   * Mobile
   *
   * @returns {boolean} returns a boolean
   * @memberof Device
   */
  mobile () {
    return Boolean(this.mobileRegEx.test(this.userAgent));
  }
}

export { Device };
