# mongoScraper

### To view deployed version, _**[click here!](https://https://protected-wildwood-17485.herokuapp.com/)**_
This app scrapes articles from the New York Times website and lets users save articles and leave comments on the latest news.

![mongoScraper Img](public/assets/imgages/.jpg)

## Technologies used:
* Node.js
* Express.js
* MongoDB
* Mongoose
* Handlebars.js
* Javascript/ES6
* jQuery
* AJAX/JSON
* NPM modules:
  * Cheerio
  * Request-Promise
* Bootstrap 
* CSS
* HTML5

#### Key Dependencies

`request`: enables `cheerio` to get access to front-end code of http://www.nytimes.com

`cheerio`: scrapes front-end code from http://www.nytimes.com

`mongoose`: manages the database-> `mongoScraper`

`express`: builds server-side routes and functions

`body-parser`: parsing info into useable data, and allows express to read the body and then parse that into a Json object that we can understand.

`express-handlebars`: a powerful front-end builder without requiring multiple html pages

#### File Structure
<br>
├── controllers<br>
|  ├── fetch.js<br>
|  ├── headline.js<br>
|  └── note.js<br>
├── models<br>
|  ├── Headline.js<br>
|  ├── index.js<br>
|  └── Note.js<br>
├── public<br>
|  └── assets<br>
├── routes<br>
|  ├── api<br>
|  ├── index.js<br>
|  └── view<br>
├── scripts<br>
|  └── scrape.js<br>
└── views<br>
|   ├── home.handlebars<br>
|   ├── layouts<br>
|   └── saved.handlebars<br>
├── package-lock.json<br>
├── package.json<br>
└── server.js<br>