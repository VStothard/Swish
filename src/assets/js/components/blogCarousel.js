// import $ from 'jquery';
import { Component } from '../classes/component';
// import { Device } from '../modules';
// var contentful = require('contentful');
// var config = require('config');

// const autocomplete = require('autocomplete.js');

/**
 * featureCarousel Carousel Component
 *
 * @class featureCarousel
 * @extends {Component}
 */
class blogCarousel extends Component {

  /**
   * Creates an instance of featureCarousel.
   *
   * @memberof blogCarousel
   */
  constructor() {
    super('C05');

    const self = this;
    console.log('running c03');
    $(".blog-slider").slick({
      autoplay: true,
      infinite: true,
      arrows: false,
      dots: false
    });
  }
}

export { blogCarousel };
