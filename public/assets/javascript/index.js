// step 14 continued.....
// ((for step15 go to assets/javascript/index.js ))

// Dont load any javascript until everything on the page is loaded
// global bootbox
$(document).ready(function() {
  // set ref to article-container div where all dynamic content goes
  // add event listeners to any dynamically gen "save article"
  // and "scrape new article btn's"
  // div that holds the articles
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", article_save);
  $(document).on("click", ".scrape-new", article_scrape);
  // when page ready run this func
  initPage();
  // empty article articleContainer. run ajax req for any unsaved hLines
  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
      // render headlines if there is any
      if (data && data.length) {
        renderArticles(data);
      }
      // if not send msg
      else {
        renderEmpty();
      }
    });
  }

  function renderArticles(article) {
    // appends html with article data to page
    // passed json array with all avail artcls in db
    var articlePanels = [];
    // pass ea artcl json obj to create_panel func that rtrns
    // bootstrap pannel w/artcl data in it
    for (var i = 0; i < article.length; i++) {
      articlePanels.push(create_panel(article[i]));
    }
    // after html for artcl stored in articlePanels Array
    // append to articlePanels container
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
        "<a class='btn btn-primary save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
      // attach artcl id to jQuery Element
      // use after user saves artcle
    );
    panel.data("_id", article._id);
    // rtrns constrctd panel jquery element
    return panel;
  }

  function renderEmpty() {
    // this func renders html stating thers no artcls to view
    // using a joined array of html string data cuz easier to read/change
    // than concat string
    var emptyAlert = $(
      [
        "<div class='alert alert-info text-center'>",
        "<h4>Attention: There are currently no NEW articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // appends data to page
    articleContainer.append(emptyAlert);
  }

  function article_save() {
    // hapens when user saves artcle
    // when articl was created it had an attached js obj w/ hLine ID
    // to element using .data method, this goes and gets that
    var articleToSave = $(this)
      .parents(".panel")
      .data();
    articleToSave.saved = true;
    $.ajax({
      method: "PUT",
      url: "/api/headlines",
      data: articleToSave
    }).then(function(data) {
      // if success, mongoose sends back ogj w/ key of "ok" w/ val of 1
      // which make "true"
      if (data.ok) {
        // running again loads all articls
        initPage();
      }
    });
  }

  function article_scrape() {
    $.get("/api/fetch").then(function(data) {
      // if scrap is succes it compares to those already in collection
      // and re-renders the artcls on page lets user know hwmny
      initPage();
      bootbox.alert(
        "<h3 class='text-center m-top-80'>" + data.message + "<h3>"
      );
    });
  }
});
