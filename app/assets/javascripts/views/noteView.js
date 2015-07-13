var NoteView = Backbone.View.extend({

  tagName: 'div',

  className: 'note-section section',

  initialize: function() {
    this.template = Handlebars.compile($('#note-template').html());
    this.editTemplate = Handlebars.compile($('#edit-note-template').html());
    this.listenTo(this.model, 'change:active', this.render);
    this.render();
  },

  events: {
    'click .remove': 'removeSelf',
    'click .note': 'edit',
    'click .save': 'save',
    'click .cancel': 'cancel',
    'click .handle': 'activate',
    'keydown .edit-note': 'shortcut'
  },

  render: function() {
    var data = this.model.toJSON();
    data.handle_class = this.model.get('active') ? 'handle active' : 'handle';
    this.$el.html(this.template(data));
  },

  edit: function() {
    var data = this.model.toJSON();
    data.handle_class = this.model.get('active') ? 'handle active' : 'handle';
    this.$el.html(this.editTemplate(data));
    this.$('.edit-note').focus();
  },

  save: function() {
    this.model.save({ content: this.$('.edit-note').val() || this.model.initialize() });
    this.render();
  },

  cancel: function() {
    this.render();
  },

  activate: function() {
    this.collectionView.activate(this.model);
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
