import $ from 'jquery';

class Component {

  constructor(id) {
    console.log('id');
    dataID = id;
    this.exists(id);
    
  }

  exists(id) {
      $("div[data-id]").each(function() {
        if ($(this).data("id") === dataID) {
          cosnsole.log(id + 'exists');
        }
    });
  }
}

export { Component };
