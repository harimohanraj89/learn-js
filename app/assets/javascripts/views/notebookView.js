var NotebookView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderOne);
    this.listenTo(this.collection, 'reset', this.render);
  },

  addCodeSection: function() {
    this.collection.create({ sectionType: 'code' });
  },

  addNoteSection: function() {
    this.collection.create({ sectionType: 'note' });
  },

  events: {
    'click .new-code-section': 'addCodeSection',
    'click .new-note-section': 'addNoteSection'
  },

  listen: function() {
    window.addEventListener('keypress', this.shortcut.bind(this));
  },

  shortcut: function(e) {
    if (String.fromCharCode(e.keyCode) === "C") {
      this.addCodeSection();
    } else if (String.fromCharCode(e.keyCode) === "N") {
      this.addNoteSection();
    }
  },

  render: function() {  
    this.collection.forEach(this.quickRenderOne);
  },

  quickRenderOne: function(section) {
    if (section.get('sectionType') === 'note') {
      var noteView = new NoteView({ model: section });
      noteView.$el.appendTo(this.$('.notebook'))
    } else if (section.get('sectionType') === 'code') {
      var codeView = new CodeView({ model: section });
      codeView.$el.appendTo(this.$('.notebook'))
    }
  },

  renderOne: function(section) {
    if (section.get('sectionType') === 'note') {
      var noteView = new NoteView({ model: section });
      noteView.$el
                .hide()
                .appendTo(this.$('.notebook'))
                .slideDown(500);
    } else if (section.get('sectionType') === 'code') {
      var codeView = new CodeView({ model: section });
      codeView.$el
                .hide()
                .appendTo(this.$('.notebook'))
                .slideDown(500, codeView.focus.bind(codeView));
    }
  }

});
