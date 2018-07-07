# mongoScraper

### To view deployed version, _**[click here!](https://https://protected-wildwood-17485.herokuapp.com/)**_
This app scrapes articles from the New York Times website and lets users save articles and leave comments on the latest news.
<br>
Home Section:<br>
![mongoScraper Img](public/assets/images/home.jpg)
<br>
Saved Section:<br>
![mongoScraper Img](public/assets/images/home2.jpg)
<br>
Saved Section with Note:<br>
![mongoScraper Img](public/assets/images/home3.jpg)
<br>
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
![FileStructure Img](public/assets/images/file.jpg)<br>