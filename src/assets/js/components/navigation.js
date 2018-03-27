// import $ from 'jquery';
import { Component } from '../classes/component';

/**
 * navigation Carousel Component
 *
 * @class navigation
 * @extends {Component}
 */
class navigation extends Component {

  /**
   * Creates an instance of navigation.
   *
   * @memberof navigation
   */
  constructor() {
    super('C04');

    const self = this;
    console.log('running c04');

    self.isInView();
    self.menuToggle();
    
  }

  isInView() {
      console.log('scrollin');
      const nav = $('.navigation');
      const headerElm = $('#header');
      const headerPosition = headerElm.offset().top + headerElm.outerHeight(true) - 100;

      $(window).on('scroll', function() {
          let pageOffset = window.pageYOffset;

          if (pageOffset > headerPosition) {
              nav.attr('data-active', 'true');
          } else {
            nav.attr('data-active', 'false');
          }
      });
  }

  menuToggle() {
    $('.menu').on('click', function() {
      $(this).toggleClass('open');
    });
  }
}

export { navigation };
