var MAPQUEST_KEY = 'WVNR0GB13tGBhlYkmTbLi8hSvNNJyr4y';

function queryLocations(q, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    callback(JSON.parse(xhr.responseText));
  };

  xhr.open('GET', 'http://open.mapquestapi.com/nominatim/v1/search.php?key=' + MAPQUEST_KEY
      + '&format=json&limit=10&accept-language=pl&bounded=1&viewbox=20.80,52.27,21.23,52.05&q='
      + encodeURIComponent(q));
  xhr.send();
}
