// step 9 here
// ((for step10 go to sripts/date.js ))

// to make scrapes possible require these 2:
var request = require("request");
var cheerio = require("cheerio");

// after going to nytimes.com found article class= stroy theme setting,
// and h2 class = stroy-heading w/ a href & link & p tag summary As examples to
// create the following:

var scrape = function(cb) {
      // body = everything from nytimes
      request("http://www.nytimes.com", function(err, res, body) {
      // similar to jquery
      var $ = cheerio.load(body);

      // new array of articles temp empty
      var article = [];

      // from nytimes.com select all theme-summary's
      $(".theme-summary").each(function(i, element) {
            // then for each theme summary:
            // grabs/scrape the text for each and cleans up any blanks etc.
            // which are all children of theme summary - then assign to the var
            var head = $(this)
            .children(".story-heading")
            .text()
            .trim();
            var url = $(this)
            .children(".story-heading")
            .children("a")
            .attr("href");
            var sum = $(this)
            .children(".summary")
            .text()
            .trim();

            if (head && sum && url) {
            // if there is a head.line,url,&sum then apply 'replace regex' method
            // which cleans up text with white space
            var headClean = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumClean = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            // makes an obj named dataToAdd out of headClean and sumClean.
            // and assigns it those attributes of h.lines and sum that are
            // req to create an artcle in model
            var dataToAdd = {
            headline: headClean,
            summary: sumClean,
            url: url
            };

            // then push new dataToAdd into artcles aray and go thru all theme-sumary's
            // on page until done
            article.push(dataToAdd);
            }
      });

      // then when done callback function sends articles
      // now array is filled with theme-summary items
      cb(article);
      });
};

// now scrape is avaialable thruout program
module.exports = scrape;
