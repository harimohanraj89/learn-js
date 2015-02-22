var CodeView = Backbone.View.extend({

  tagName: 'div',

  className: 'code-section section',

  initialize: function() {
    this.template = Handlebars.compile($("#code-section-template").html());
    this.listenTo(this.model, 'destroy', this.removeSelf);
    this.render();
  },

  events: {
    'click .evaluate': 'evaluate',
    'click .remove': 'destroy',
    'keypress .input': 'shortcut'
  },

  code: function() {
    return this.$('.input').val();
  },

  evaluate: function() {
    this.$('.output-body').html('');
    this.model.save({ content: this.code() });
    try {
      eval(this.code());
    } catch (e) {
      this.p('Error!');
      this.p(e.message);
    }
    this.$('.output').show();
  },

  p: function(something) {
    this.$('.output-body').append($('<li>').html(something));
  },

  destroy: function() {
    console.log(this.model.toJSON());
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  focus: function() {
    this.$('.input').focus();
  },

  removeSelf: function() {
    this.$el.slideUp(500, function() {
      this.remove();
    })
  },

  shortcut: function(e) {
    if (e.shiftKey && e.which === 13) {
      this.evaluate();
      e.preventDefault();
    }
    e.stopPropagation();
  },

  defaultContent: function() {
    return 'this.p("Hello there.")';
  }

});
