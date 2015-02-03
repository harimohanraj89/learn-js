var NotebookView = Backbone.View.extend({

  addCodeSection: function() {

    var codeView = new CodeView();
    codeView.$el
              .hide()
              .appendTo(this.$('.notebook'))
              .slideDown(500, codeView.focus.bind(codeView));

  },

  addNoteSection: function() {

    var noteView = new NoteView();
    noteView.$el
              .hide()
              .appendTo(this.$('.notebook'))
              .slideDown(500);

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
  }

});
