var Section = Backbone.Model.extend({
  defaults: {
    sectionType: 'note'
  },

  initialize: function() {
    var type = this.get('sectionType');
    if (type === 'note') {
      this.set('content', 'This is a new note.');
    } else if (type === 'code') {
      this.set('content', 'this.p("Hello, world!");');
    }
  }
});
