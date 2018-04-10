import "babel-polyfill";

/**
 * Import Classes
 */
import {
  Component,
  featureCarousel,
  blogCarousel,
  navigation,
  modal,
  smoothScroll,
  blogFeed,
  blogTiles,
  blogPost
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
  new smoothScroll();
  new blogCarousel();
  new blogFeed();
  new blogTiles();
  new blogPost();


  /**
   * Init modules
   */
});
