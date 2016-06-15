var tablesort = require("tablesort");

function cleanNumber (i) {
  return i.replace(/[^\-?0-9.]/g, "");
}

function compareNumber (a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  a = isNaN(a) ? 0 : a;
  b = isNaN(b) ? 0 : b;

  return a - b;
}

tablesort.extend("number", function (item) {
  return item.match(/^-?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // Prefixed currency
    item.match(/^-?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
    item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // Number
  }, function(a, b) {
    a = cleanNumber(a);
    b = cleanNumber(b);
    return compareNumber(b, a);
});

tablesort(document.getElementById("standings"), {
  descending: true
});

var allResultsDiv = document.querySelector(".all-results");

[].forEach.call(document.querySelectorAll(".standings tbody td a"), function (el) {
  el.addEventListener("click", function (e) {
    var row = e.target.parentNode.parentNode;
    var selectedPlayer = row.getAttribute("data-player");

    [].forEach.call(document.querySelectorAll(".breakdown"), function (el) {
      el.style.display = "none";
    }, false);

    allResultsDiv.style.display = "none";
    var playerBreakdownDiv = document.querySelector(".breakdown[data-player='" + selectedPlayer + "']");
    playerBreakdownDiv.style.display = "block";
  }, false);
});
