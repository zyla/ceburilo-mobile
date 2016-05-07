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

function locationAutocompleteWidget(inputElement) {
  var selectedItem = null;

  function triggerSearch() {
    if(inputElement.value == '')
      return;

    queryLocations(inputElement.value, function(results) {
      displayAutocompleteResults(results);
    });
  }

  triggerSearch = delayed(triggerSearch, 300);

  inputElement.addEventListener('focus', triggerSearch);
  inputElement.addEventListener('input', triggerSearch);

  function displayAutocompleteResults(results) {
    showAutocomplete(inputElement, results.map(renderItem));

    function renderItem(item) {
      var elem = copyTemplate('autocomplete-item');
      elem.querySelector('.name').innerText = item.display_name;

      elem.addEventListener('click', function() {
        setSelectedItem(item);
        hideAutocomplete();
      });
      return elem;
    }
  }

  function setSelectedItem(item) {
    selectedItem = item;
    inputElement.value = item.display_name;
  }

  return {
    getSelectedItem: function() { return selectedItem; },
    setSelectedItem: setSelectedItem,
  };
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
  document.getElementById('show-main').addEventListener('click', function() {
    main();
  });

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
      .addTo(mymap);

    L.popup({ closeButton: false, closeOnClick: false })
      .setLatLng(station.location)
      .setContent(station.number + ' ' + station.name)
      .addTo(mymap);
  });

  function fixLatLng(point) {
    return [point[1], point[0]];
  }
}

main();
