// step 10 here
// ((for step11 go to controllers/headlines ))

var makeDate = function() {
  var d = new Date();

  var formattedDate = "";

  //  these are built in javascript functions
  //  we add +1 to getMonth cuz it counts months at zero index
  formattedDate += d.getMonth() + 1 + "_";
  formattedDate += d.getDate() + "_";
  formattedDate += d.getFullYear();
  return formattedDate;
};

module.exports = makeDate;
