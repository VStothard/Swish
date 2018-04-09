import { Component } from '../classes/component';
import { Device } from '../modules';
var contentful = require('contentful');
var config = require('config');

// const autocomplete = require('autocomplete.js');

/**
 * blogCarousel Carousel Component
 *
 * @class blogCarousel
 * @extends {Component}
 */
class blogCarousel extends Component {

  /**
   * Creates an instance of blogCarousel.
   *
   * @memberof blogCarousel
   */
  constructor() {
    super('C03');

    //check if element exists on the page
    const dataID = 'C03';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute alertBar
        if ($(this).data("id") === dataID) {
            self.populateSlides();
            // self.initSlick();
        }
    });
  }

  populateSlides() {
    const self = this;
    const carouselCont = $('.blog-slider');

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

          var featureSlide ='<div class="slide slider-slide">' +
                                '<a href="' + postURL + '">' +               
                                    '<div class="slider-image" style="background-image: url(' + slideBackground + ')"></div>' +
                                    '<div class="slider-post-info">' +
                                        '<h2>' + entry.fields.title + '</h2>' +
                                    '</div>' +
                                '</a>' +
                            '</div>';
          
          //add the entry to the element
          html = html + featureSlide;

        });

        // replace html with the created blog tiles to display 
        carouselCont.html(html); 

        $(".blog-slider").slick({
          autoplay: true,
          dots: false,
          infinite: true
        });
    })
    .catch(console.error);
  }
}

export { blogCarousel };
