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
class featureCarousel extends Component {

  /**
   * Creates an instance of featureCarousel.
   *
   * @memberof featureCarousel
   */
  constructor() {
    super('C05');

    const self = this;
    console.log('running c03');
    $(".slider").slick({
      autoplay: true,
      infinite: true,
      arrows: false,
      dots: true
    });

    // //check if element exists on the page
    // const dataID = 'C04';
    // const self = this;
    // $("div[data-id]").each(function() {
    //     // if exists, execute alertBar
    //     if ($(this).data("id") === dataID) {
    //         self.populateSlides();
    //         // self.initSlick();
    //     }
    // });
  }

  populateSlides() {
    const self = this;
    const carouselCont = $('.feature-carousel-cont');

    //contentful initialisation 
    var client = contentful.createClient({
      space: config.config.space,
      accessToken: config.config.accessToken
    });

    // get all blog posts and render to the page
    client.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as',
      limit: 3
    })
    .then((response) => {
        var html = '';

        console.log(response.items);

        response.items.forEach(function (entry) {
          var slideBackground = 'https:' + entry.fields.featuredImage.fields.file.url;
          var postURL = window.location.origin + '/blog-post.html?id=' + entry.sys.id;

          var featureSlide = '<div class="slide">'
                                + '<div class="slide-cover" style="background-image: url(' + slideBackground + ')"></div>'
                                + '<div class="slide-details"><a href="' + postURL + '">'
                                  + '<h2 class="slide-title">' + entry.fields.title + '</h2>'
                                  + '<p class="slide-date">' + entry.fields.date + '</p></a>'
                                + '</div>'
                              + '</div>';
          
          //add the entry to the element
          html = html + featureSlide;

        });

        // replace html with the created blog tiles to display 
        carouselCont.html(html); 

        $(".feature-carousel").slick({
          autoplay: true,
          dots: false,
          infinite: true,
          vertical: true,
          verticalSwiping: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                vertical: false,
                verticalSwiping: false
              }
            }
          ]
        });
    })
    .catch(console.error);
  }
}

export { featureCarousel };
