var Section = Backbone.Model.extend({

  urlRoot: '/sections',

  defaults: {
    section_type: 'note'
  },

  initialize: function() {
    if (!this.get('content')) {
      var type = this.get('section_type');
      if (type === 'note') {
        this.set('content', 'This is a new note.');
      } else if (type === 'code') {
        this.set('content', 'this.p("Hello, world!");');
      }
    }
  }
});
