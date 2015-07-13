var NotebookView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderOne);
    this.listenTo(this.collection, 'reset', this.render);
  },

  addCodeSection: function() {
    this.collection.create({ section_type: 'code' });
  },

  addNoteSection: function() {
    this.collection.create({ section_type: 'note' });
  },

  activate: function(model) {
    this.collection.each(function(model) { model.set('active', false); })
    model.set('active', 'true');
  },

  events: {
    'click .new-code-section': 'addCodeSection',
    'click .new-note-section': 'addNoteSection'
  },

  keyListen: function() {
    window.addEventListener('keypress', this.shortcut.bind(this));
    return this;
  },

  shortcut: function(e) {
    if (String.fromCharCode(e.keyCode) === "C") {
      this.addCodeSection();
    } else if (String.fromCharCode(e.keyCode) === "N") {
      this.addNoteSection();
    }
  },

  newNoteView: function(opts) {
    var noteView = new NoteView(opts);
    noteView.collectionView = this;
    return noteView;
  },

  newCodeView: function(opts) {
    var codeView = new CodeView(opts);
    codeView.collectionView = this;
    return codeView;
  },

  render: function() {
    this.collection.forEach(this.quickRenderOne.bind(this));
  },

  quickRenderOne: function(section) {
    if (section.get('section_type') === 'note') {
      var noteView = this.newNoteView({ model: section });
      noteView.$el.appendTo(this.$('.notebook'))
    } else if (section.get('section_type') === 'code') {
      var codeView = this.newCodeView({ model: section });
      codeView.$el.appendTo(this.$('.notebook'))
    }
  },

  renderOne: function(section) {
    if (section.get('section_type') === 'note') {
      var noteView = new NoteView({ model: section });
      noteView.$el
                .hide()
                .appendTo(this.$('.notebook'))
                .slideDown(500);
    } else if (section.get('section_type') === 'code') {
      var codeView = new CodeView({ model: section });
      codeView.$el
                .hide()
                .appendTo(this.$('.notebook'))
                .slideDown(500, codeView.focus.bind(codeView));
    }
  }

});
