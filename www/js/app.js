function main() {
  showTemplate('main');

  var input_begin = locationAutocompleteWidget(document.getElementById('input_begin'));
  var input_end = locationAutocompleteWidget(document.getElementById('input_end'));

  document.getElementById('button_search').addEventListener('click', function() {
    queryRoute({
      begin: input_begin.getSelectedItem(),
      end: input_end.getSelectedItem()
    }, map);
  });
}

function delayed(fn, ms) {
  var timer;

  return function() {
    if(timer) {
      clearTimeout(timer);
    }

    var self = this, args = arguments;

    timer = setTimeout(function() {
      fn(self, args);
    }, ms);
  };
}

function map(data) {
  showTemplate('map');

  var mymap = L.map("mapid");
  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(mymap);

  var routePoints = data.path.points.coordinates.map(fixLatLng);

  mymap.fitBounds(L.latLngBounds(routePoints), {});
  L.polyline(routePoints, {
    color: '#000080', opacity: 0.8,
  }).addTo(mymap);

  data.stations.forEach(function(station) {
    L.circleMarker(station.location,
        { color: '#0000d0', opacity: 0.8, fillOpacity: 0.8, radius: 7 })
      .bindLabel(station.number + ' ' + station.name, { noHide: true })
      .addTo(mymap);
  });

  document.querySelector('.route-time').innerText = formatTime(data.path.time);
  document.querySelector('.route-distance').innerText = formatDistance(data.path.distance);

  function fixLatLng(point) {
    return [point[1], point[0]];
  }

  function formatTime(ms) {
    var seconds = ms / 1000;

    var hoursStr = '';

    if(seconds > 3600) {
      var hours = Math.floor(seconds / 3600);
      hoursStr = hours + ' godz. '; 
      seconds -= hours * 3600;
    }

    return hoursStr + Math.ceil(seconds / 60) + ' min';
  }

  function formatDistance(distance) {
    return Math.round(distance / 1000, 1) + ' km';
  }
}

window.addEventListener('load', function() {
  main();
});
