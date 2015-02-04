var HudView = Backbone.View.extend({

  initialize: function() {
    this.templates = {
      howTo: Handlebars.compile($('#how-to-template').html()),
      keyBindings: Handlebars.compile($('#key-bindings-template').html())
    }
    this.renderHowTo();
  },

  events: {
    'click .show-instructions': 'showInstructions',
    'click .instructions': 'hideInstructions',
    'click .instructions .inner-modal': 'doNothing',
    'click .show-how-to': 'renderHowTo',
    'click .show-key-bindings': 'renderKeyBindings'
  },

  showInstructions: function() {
    this.$('.instructions').css('z-index', '1');
  },

  hideInstructions: function() {
    this.$('.instructions').css('z-index', '-1');
  },

  doNothing: function(e) {
    e.stopPropagation();
  },

  renderHowTo: function() {
    this.render('howTo');
  },

  renderKeyBindings: function() {
    this.render('keyBindings');
  },

  render: function(template) {
    if (this.templates[template]) {
      this.$('.content').html(this.templates[template]());
    }
  }

});
