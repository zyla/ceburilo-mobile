function main() {
  showTemplate('main');

  var input_begin = locationAutocompleteWidget(document.getElementById('input_begin'));
  var input_end = locationAutocompleteWidget(document.getElementById('input_end'));

  document.getElementById('button_search').addEventListener('click', function() {
    var begin = input_begin.getSelectedItem(); // TODO check null
    var end = input_end.getSelectedItem();

    goTo('map', {
      begin_lat: begin.lat,
      begin_lon: begin.lon,
      end_lat: end.lat,
      end_lon: end.lon,
    });
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

function map(params) {
  showTemplate('map');

  var mymap = L.map("mapid", {
    zoomControl: false
  });
  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(mymap);

  queryRoute(params, function(data) {

    var routePoints = data.path.points.coordinates.map(fixLatLng);
    var stations = data.stations;

    mymap.fitBounds(L.latLngBounds(routePoints), {});

    var beginPoint = parsePoint(params.begin_lat, params.begin_lon);
    var endPoint = parsePoint(params.end_lat, params.end_lon);

    var walkPathColor = '#aaa';
    var beginPointColor = '#ff8000';
    var endPointColor = '#00d000';
    var routeColor = '#000080';
    var stationColor = '#0000d0';

    addPath([beginPoint, stations[0].location], walkPathColor);
    addPath([stations[stations.length - 1].location, endPoint], walkPathColor);

    addPath(routePoints, routeColor);

    data.stations.forEach(function(station) {
      var label = station.number + ' ' + station.name;
      addPoint(station.location, stationColor, label);
    });

    addPoint(beginPoint, beginPointColor);
    addPoint(endPoint, endPointColor);

    function addPath(path, color) {
      return L.polyline(path, {
        color: color, opacity: 0.8,
      }).addTo(mymap);
    }

    function addPoint(point, color, label) {
      var marker = L.circleMarker(point,
          { color: color, opacity: 0.8, fillOpacity: 0.8, radius: 7 });

      if(label)
        marker.bindLabel(label, { noHide: true });

      marker.addTo(mymap);
      return marker;
    }

    document.querySelector('.route-time').innerText = formatTime(data.path.time);
    document.querySelector('.route-distance').innerText = formatDistance(data.path.distance);

  });

  function fixLatLng(point) {
    return [point[1], point[0]];
  }

  function parsePoint(lat, lon) {
    return [parseFloat(lat), parseFloat(lon)];
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
  loadRoute();
});
