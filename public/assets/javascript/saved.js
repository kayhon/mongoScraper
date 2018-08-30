// step 15 continued.....
// ((LAST STEP  ))

// Dont load any javascript until everything on the page is loaded
// global bootybox
$(document).ready(function() {
  // creates variable for artic container on saved page
  var articleContainer = $(".article-container");
  //  adds event listers 4dynamically gen btns 4 deleting artcls,
  //  pulls up notes, saves them, and can delete them
  $(document).on("click", ".btn.delete", article_delete);
  $(document).on("click", ".btn.notes", article_notes);
  $(document).on("click", ".btn.save", note_save);
  $(document).on("click", ".btn.note-delete", note_delete);
  // starts everything when the page is loaded
  initPage();
  // similiar to the one on index.js but looking for headlines w/saved val of true
  // instead of false
  function initPage() {
    //  empties article container, runs ajax req for saved h.lines
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      // if ther is a h.line then create them on the page
      if (data && data.length) {
        renderArticles(data);
      }
      // if not match query then display "dont have any" msg
      else {
        renderEmpty();
      }
    });
  }

  function renderArticles(article) {
    // appends html w/artcl data to page the passes json Array
    // w/all avail artcl's from db
    var articlePanels = [];
    // pass each artcl json obj 2 the create_panel func that rtrns
    // bootsrap panel w/artcl data in it
    for (var i = 0; i < article.length; i++) {
      articlePanels.push(create_panel(article[i]));
    }
    // w/html, ea artcle is stored in an articlePannel array, then
    // appends them to the articlePannels articleContainer.
    articleContainer.append(articlePanels);
  }

  function create_panel(article) {
    // takes in a 1json obj for artcl/h.line and make jquery Element
    // containing all of frmtd html for articlePannel (hLine+id+article)
    var panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "<a class='btn btn-danger delete'>",
        "Delete",
        "</a>",
        "<a class='btn btn-primary notes'>Notes</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);

    return panel;
  }

  function renderEmpty() {
    //  creates html to page saying no artcls to view using a joined Array of
    //  html string data cuz easier to read/change than concat string
    var emptyAlert = $(
      // the 'default' bootstrap color isnt working properly,
      //  and i prefer this look/ also info showing purple
      [
        "<div class='alert alert-info text-center'>",
        "<h4>Attention: There are currently no SAVED articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would you like to browse the available New York Times articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    //  appends this data to page
    articleContainer.append(emptyAlert);
  }

  function render_notes(data) {
    //  creates currentNote var to temp store each note and an
    //  array of note lists items to go in note modal,when done
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      // no notes = msg
      currentNote = [
        "<li class='list-group-item'>",
        "No notes for this article yet.",
        "</li>"
      ].join("");
      notesToRender.push(currentNote);
    } else {
      // if notes then go thru each one
      for (var i = 0; i < data.notes.length; i++) {
        //  make li element to hold noteText & del btn
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
          // the note will get attached to ID
        );
        //  stores note id on del btn for easy access whn deleting
        currentNote.children("button").data("_id", data.notes[i]._id);
        // adds currentNote to notesToRender array
        notesToRender.push(currentNote);
      }
    }
    //  adds notesToRender to the note-container inside note modal
    $(".note-container").append(notesToRender);
  }

  function article_delete() {
    // handles deleting artcls/hLines
    // grabs id of artcl to delete form the panel element the del btn is in.
    var articleToDelete = $(this)
      .parents(".panel")
      .data();

    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      //  re-renders page w/out the item
      if (data.ok) {
        initPage();
      }
    });
  }

  function article_notes() {
    //  opens note modal to display notes/ grabs id of artcle to get notes from
    //  panel element the del btn is inside of
    var currentArticle = $(this)
      .parents(".panel")
      .data();
    // pulls the notes w/ this h.line/artcle ID
    $.get("/api/notes/" + currentArticle._id).then(function(data) {
      //  builds html to add to note modal
      var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes For Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
      ].join("");
      // adds the frmated html to the note modal
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      //  add artcl info + notes to save btn 4 easyAccess
      $(".btn.save").data("article", noteData);
      //  populates note html in modal created///creates noteslist w/notesData
      render_notes(noteData);
    });
  }

  function note_save() {
    //  what hapens when user saves a new note per article
    //  sets var to hold frmttd data about note & grabs note
    var noteData;
    var newNote = $(".bootbox-body textarea")
      .val()
      .trim();
    // if thers a note, format it & post to /api/notes route & send
    // frmttd noteData as well
    if (newNote) {
      noteData = {
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(function() {
        bootbox.hideAll();
      });
    }
  }

  function note_delete() {
    var noteToDelete = $(this).data("_id");

    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      bootbox.hideAll();
    });
  }
});
