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
  }
});
