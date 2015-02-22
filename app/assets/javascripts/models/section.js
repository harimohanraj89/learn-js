var Section = Backbone.Model.extend({

  urlRoot: '/sections',

  defaults: {
    sectionType: 'note'
  },

  initialize: function() {
    if (!this.get('content')) {
      var type = this.get('sectionType');
      if (type === 'note') {
        this.set('content', 'This is a new note.');
      } else if (type === 'code') {
        this.set('content', 'this.p("Hello, world!");');
      }
    }
  }
});
