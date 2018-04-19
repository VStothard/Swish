// import $ from 'jquery';
import { Component } from '../classes/component';
import forEach from 'lodash/forEach';


/**
 * ctaAccordion Carousel Component
 *
 * @class ctaAccordion
 * @extends {Component}
 */
class ctaAccordion extends Component {

  /**
   * Creates an instance of ctaAccordion.
   *
   * @memberof ctaAccordion
   */
  constructor() {
    super('C04');

    const self = this;
    
    self.accordion();
  }

  accordion() {
      var accordion = $('.cta-form');
      var goto = $('.accord-goto');
      var btn = $('.accord-btn')

      goto.on('click', () => {
        console.log(accordion.attr('data-active'));
        if (accordion.attr('data-active') == 'false') {
          accordion.attr('data-active', 'true');
          btn.hide();
        }
      });

      btn.on('click', () => {
        console.log(accordion.attr('data-active'));
        if (accordion.attr('data-active') == 'false') {
          accordion.attr('data-active', 'true');
          btn.hide();
        }
      });
  }
}

export { ctaAccordion };
