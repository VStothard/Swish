// import $ from 'jquery';
import { Component } from '../classes/component';

/**
 * modal Carousel Component
 *
 * @class modal
 * @extends {Component}
 */
class modal extends Component {

  /**
   * Creates an instance of modal.
   *
   * @memberof modal
   */
  constructor() {
    super('C04');

    const self = this;

    console.log('running c04');

    self.modalClose();
    self.quoteToggle();    
  }

  modalClose() {
    const body = $('body');
    const modal = $('.modal');
    const quoteForm = $('.quote-form');
    console.log('click event running');

    modal.on('click', function(e) {
      body.removeClass('no-scroll');
      modal.attr('data-active', 'false');
      quoteForm.attr('data-active', 'false');
    });
  }

  quoteToggle() {
    const body = $('body');
    const modal = $('.modal');
    const quoteForm = $('.quote-form');
    const quoteBtn = $('.quote-btn');

    quoteBtn.on('click', function() {
      body.addClass('no-scroll');
      modal.attr('data-active', 'true');
      quoteForm.attr('data-active', 'true');
    });
  }
}

export { modal };
