var NoteView = Backbone.View.extend({

  tagName: 'div',

  className: 'note-section section',

  initialize: function() {
    this.template = Handlebars.compile($('#note-template').html());
    this.editTemplate = Handlebars.compile($('#edit-note-template').html());
    this.render();
  },

  events: {
    'click .remove': 'removeSelf',
    'click .note': 'edit',
    'click .save': 'save',
    'click .cancel': 'cancel',
    'keydown .edit-note': 'shortcut'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  edit: function() {
    this.$el.html(this.editTemplate(this.model.toJSON()));
    this.$('.edit-note').focus();
  },

  save: function() {
    this.model.save({ content: this.$('.edit-note').val() || this.model.initialize() });
    this.render();
  },

  cancel: function() {
    this.render();
  },

  removeSelf: function() {
    this.$el.slideUp(500, function() {
      this.remove();
    })
  },

  shortcut: function(e) {
    if (e.shiftKey && e.which === 13) {
      this.save();
      e.preventDefault();
    } else if (e.which === 27) {
      this.cancel();
      e.preventDefault();
    }
    e.stopPropagation();
  }

});
