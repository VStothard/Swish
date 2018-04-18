// import $ from 'jquery';
import { Component } from '../classes/component';
import forEach from 'lodash/forEach';


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

    self.checkState();
    self.modalClose();
    self.quoteToggle();    
  }

  checkState() {
    const body = $('body');
    const modal = $('.modal');
    var page = window.location.search.split('submit=')[1];
    const quoteThanks = $('.quote-form-thankyou');
    
    if (page === 'thankyou') {
      console.log('thankyou', 9000);
      body.addClass('no-scroll');
      modal.attr('data-active', 'true');
      quoteThanks.attr('data-active', 'true');
    }
  }

  modalClose() {
    const body = $('body');
    const modal = $('.modal');
    const quoteForm = $('.quote-form');

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
    const quoteThanks = $('.quote-form-thankyou');

    quoteBtn.on('click', function() {
      body.addClass('no-scroll');
      modal.attr('data-active', 'true');
      quoteForm.attr('data-active', 'true');
      quoteThanks.attr('data-active', 'false');
    });
  }
}

export { modal };
