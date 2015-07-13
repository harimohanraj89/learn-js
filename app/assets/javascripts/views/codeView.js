var CodeView = Backbone.View.extend({

  tagName: 'div',

  className: 'code-section section',

  initialize: function() {
    this.template = Handlebars.compile($("#code-section-template").html());
    this.listenTo(this.model, 'change:active', this.render);
    this.listenTo(this.model, 'destroy', this.removeSelf);
    this.render();
  },

  events: {
    'click .evaluate': 'evaluate',
    'click .handle': 'activate',
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

  p: function(output) {
    this.$('.output-body').append($('<li>').html(output));
  },

  activate: function() {
    this.collectionView.activate(this.model);
  },

  destroy: function() {
    console.log(this.model.toJSON());
    this.model.destroy();
  },

  render: function() {
    var data = this.model.toJSON();
    data.handle_class = this.model.get('active') ? 'handle active' : 'handle';
    this.$el.html(this.template(data));
  },

  focus: function() {
    this.$('.input').focus();
  },

  removeSelf: function() {
    this.$el.slideUp(500, function() {
      this.remove();
    });
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
