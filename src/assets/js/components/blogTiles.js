import { Component } from '../classes/component';
import $ from 'jquery';
var contentful = require('contentful');
var config = require('config');

/**
 *
 *
 * @class blogTiles
 * @extends {Component}
 */
class blogTiles extends Component {

  /**
   * Creates an instance of blogTiles.
   *
   * @memberof blogTiles
   */
  constructor() {
    super('C05'); //super not working currently

    //check if element exists on the page
    const dataID = 'C05';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute blogTiles
        if ($(this).data("id") === dataID) {
          self.blogTiles();
        }
    });
  }


  /**
   * blogTiles Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof blogFeed
   */
  blogTiles(param) {
    const self = this;
    const tilesCont = $('#blog-tiles-cont');

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

        response.items.forEach(function (entry) {
            console.log(entry);

            var slideBackground = 'https:' + entry.fields.featuredImage.fields.file.url;
            var postURL = window.location.origin + '/blog-post.html?id=' + entry.sys.id;
            //http://localhost:8000/blog-post.html?id=62RxrOSmeQWqQSsgo4WaAa

            console.log(slideBackground, 3000);

            //TODO swap this out with handlebars templating
            var blogTile = '<div class="blog__item">' +
                                '<div class="blog__item-img" style="background-image: url(' + slideBackground + ')"></div>' +
                                '<div class="blog__item-preview grid-x">' +
                                    '<div class="blog__item-heading small-10 cell">' +
                                        '<h3>' + entry.fields.title + '</h3>' +
                                    '</div>' +
                                    '<div class="blog__item-heading-clip small-2 cell"></div>' +
                                    '<div class="blog__item-desc small-12">' +
                                        '<p>' + entry.fields.postPreview + '</p>' +
                                        '<a href="' + postURL + '" class="read">READ ON</a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            
            //add the entry to the element
            html = html + blogTile;
        });

        // replace html with the created blog tiles to display 
        tilesCont.html(html); 
    })
    .catch(console.error);
  }
}

export { blogTiles };