var NoteView = Backbone.View.extend({

  tagName: 'div',

  className: 'note-section section',

  initialize: function() {
    this.model = new Section({ contentType: 'note' });
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
    this.$el.html(this.editTemplate({ content: this.content }));
    this.$('.edit-note').focus();
  },

  save: function() {
    this.content = this.$('.edit-note').val();
    if (this.content === '') {
      this.content = "This is a new note."
    }
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
