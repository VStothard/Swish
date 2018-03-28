import "babel-polyfill";

/**
 * Import Classes
 */
import {
  Component,
  featureCarousel,
  navigation,
  modal
} from './modules';

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');

  /**
   * Classes
   */
  // new Browser();
  new Component();

  /**
   * Views
   * Run on a particular page.
   */
  

  /**
   * Components
   */

  new featureCarousel();
  new navigation();
  new modal();

  /**
   * Init modules
   */
});
