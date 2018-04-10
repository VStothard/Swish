import { Component } from '../classes/component';
import $ from 'jquery';
import forEach from 'lodash/forEach';

var contentful = require('contentful');
var marked = require('marked');
var config = require('config');

/**
 *
 *
 * @class blogPost
 * @extends {Component}
 */
class blogPost extends Component {

  /**
   * Creates an instance of blogPost.
   *
   * @memberof blogPost
   */
  constructor() {
    super('C12'); //super not working currently
    console.log('blog posts ');

    //check if element exists on the page
    const dataID = 'C12';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute blogPost
        if ($(this).data("id") === dataID) {
            self.displayPost();
        }
    });
  }


  displayPost() {
    var query = window.location.search.substring(1);
    var id = '';
    var vars = query.split("&");
    const postCont = $('#blog-post-cont');

    const client = contentful.createClient({
        space: config.config.space,
        accessToken: config.config.accessToken
    });

    forEach(vars, function (el) {
        var pair = el.split("=");
        if(pair[0] == 'id'){
            id = pair[1]; 
        }
    });

    console.log(id, 200);


    client.getEntries({
        content_type: '2wKn6yEnZewu2SCCkus4as'
    })
    .then((response) => {
        // console.log(response.items);
        console.log(response.items, 'blog post');
        var html = '';
        response.items.forEach(function (entry) {
            if(entry.sys.id == id) {
                console.log('SNAP!');
                var featureImg = entry.fields.featuredImage.fields.file.url;
                var title = entry.fields.title;
                var body = entry.fields.body;

                var blogPost = '<div class="blog__item">' +
                                    '<div class="blog__item-img" style="background-image: url(' + featureImg + ')"></div>' +
                                    '<div class="blog__item-preview grid-x">' +
                                        '<div class="blog__item-heading small-10 cell">' +
                                            '<h3>' + marked(title) + '</h3>' +
                                        '</div>' +
                                        '<div class="blog__item-heading-clip small-2 cell"></div>' +
                                        '<div class="blog__item-desc small-12">' +
                                            marked(body) + 
                                        '</div>' +
                                    '</div>' +
                                '</div>';
            
                //add the entry to the element
                html = html + blogPost;
            }
        });

        postCont.html(html);
    })
    .catch(console.error)
  }


}

export { blogPost };