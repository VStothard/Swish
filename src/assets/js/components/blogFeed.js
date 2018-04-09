import { Component } from '../classes/component';
import $ from 'jquery';
import forEach from 'lodash/forEach';
import times from 'lodash/times';

var contentful = require('contentful');
var config = require('config');

/**
 *
 *
 * @class blogFeed
 * @extends {Component}
 */
class blogFeed extends Component {

  /**
   * Creates an instance of blogFeed.
   *
   * @memberof blogFeed
   */
  constructor() {
    super('C11'); //super not working currently

    console.log('hello');

    const self = this;
    self.getPosts(); //send request to get posts
  }

  getPosts() {
    const self = this;

    //contentful initialisation 
    var client = contentful.createClient({
      space: config.config.space,
      accessToken: config.config.accessToken
    });
    
    // on page load check URL for page=X 
    var query = window.location.search.substring(1);
    var page = '';
    var vars = query.split("&");

    forEach(vars, function (el) {
        var pair = el.split("=");
        if(pair[0] == 'page'){
            page = Number(pair[1]); //convert result to a number
        }
    });

    // from contentful, get the total number of entries, and set inital limits
    var totalPosts = 0; //create var for total number of posts and set to a number
    var numPages; // create var for the total number of pages
    const perPage = 1; //limit number of posts per page
    var toSkip = page * perPage; //calculate what post to load from 

    //if page number exists in URL, run the getEntries again and set the pagination/blog posts to the right page
    if (page > 0) {
      //request entries, starting from the Xth entry (toSkip)
      client.getEntries({
        content_type: '2wKn6yEnZewu2SCCkus4as',
        limit: perPage,
        skip: toSkip
      })
      .then((response) => {
          var Response = response;

          totalPosts = response.total; // get the total number of posts
          numPages = Math.round(totalPosts / perPage); // divide by the number to dispay per page, round up to whole number (eg if there are 22 entried you need 3 pages)
          // create pagination controls based on the above number
          // assign 'active' class to the correct pagination number
          // assign 'skip' value to variable which you can pass into the blog feed function
          // run blogFeed function to load the blog posts for the first page

          blogFeed.blogFeed(response);
          blogFeed.pagination(numPages);
      })
      .catch(console.error);

    //if page number is not in URL, or it is equal to 0, get entries and set to the first page
    } else {
      //request entries, displaying posts from the 1st entry
      client.getEntries({
        content_type: '2wKn6yEnZewu2SCCkus4as',
        limit: perPage,
        skip: 0
      })
      .then((response) => {
          var Response = response;
          totalPosts = response.total; //get the total number of posts
          numPages = Math.round(totalPosts / perPage); // divide by the number to dispay per page, round up to whole number (eg if there are 22 entried you need 3 pages)
          // create pagination controls based on the above number
          // assign 'active' class to the correct pagination number
          // assign 'skip' value to variable which you can pass into the blog feed function
          // run blogFeed function to load the blog posts for the first page

          //generate the blogPost html from template and append to page
          blogFeed.blogFeed(response);
          blogFeed.pagination(numPages);
      })
      .catch(console.error);
    }
  }

  /**
   * blogFeed Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof blogFeed
   */
  static blogFeed(response) {
    console.log(response, 'BLOG FEED RESPONSE');
    const self = this;
    const feedCont = $('#blog-feed-cont');

    //create the element you will be plugging into the blog feed container
    var html = '';

    response.items.forEach(function (entry) {
        var postURL = window.location.origin + '/blog-post.html?id=' + entry.sys.id;

        var blogTile =  '<div class="blog__item">' +
                            '<div class="blog__item-img">' +
                                '<img src="https:' + entry.fields.featuredImage.fields.file.url +'" alt="">' +
                            '</div>' +
                            '<div class="blog__item-preview grid-x">' +
                                '<div class="blog__item-heading small-10 cell">' +
                                    '<h3>' + entry.fields.title + '</h3>' +
                                '</div>' +
                                '<div class="blog__item-heading-clip small-2 cell"></div>' +
                                '<div class="blog__item-desc small-12">' +
                                    '<p>' + entry.fields.postPreview + '</p>' +
                                    '<a class="read" href="' + postURL + '">READ POST</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        
        //add the entry to the element
        html = html + blogTile;
    });

    // replace html with the created blog tiles to display 
    feedCont.html(html); 
  }

  static pagination(numPages) {
    console.log('pagination template', numPages);
    var html = '';
    var pagination = $('.pagination');

    times(numPages, (page) => {
      console.log('how many times');
      var createItem = '<li><a href="' + window.location.origin + '/blog-feed.html?page=' + page + '">' + (page + 1) + '</a></li>';
      
      html = html + createItem;
    });

    pagination.html(html);
  }
}

export { blogFeed };