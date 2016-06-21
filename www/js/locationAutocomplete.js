function locationAutocompleteWidget(inputElement) {
  var selectedItem = null;
  var lastInput = '';

  function triggerSearch() {
    if(inputElement.value == lastInput) {
      return;
    }

    if(inputElement.value == '' || selectedItem != null) {
      var locations = getRecentLocations();
      if(locations.length > 0) {
        displayAutocompleteResults(locations, true);
      }
      return;
    }

    lastInput = inputElement.value;

    queryLocations(inputElement.value, function(results) {
      displayAutocompleteResults(results);
    });
  }

  triggerSearch = delayed(triggerSearch, 300);

  inputElement.addEventListener('input', function onInput() {
    selectedItem = null;
    triggerSearch();
  });

  inputElement.addEventListener('focus', function onFocus() {
    inputElement.select();
    triggerSearch();
  });

  function displayAutocompleteResults(results, isRecent) {
    showAutocomplete(inputElement,
        renderRecentMarker().concat(results.map(renderItem)));

    function renderRecentMarker() {
      if(isRecent) {
        return [copyTemplate('autocomplete-recent-marker')];
      } else {
        return [];
      }
    }

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

  function getRecentLocations() {
    try {
      return JSON.parse(localStorage.recentLocations);
    } catch (e) {
      return [];
    }
  }

  function addRecentLocation(item) {
    var locations = getRecentLocations();
    var newLocations = [].concat.apply([item],
        locations
        .filter(function(x) { return x.display_name != item.display_name; })
        .slice(0, 5))
    localStorage.recentLocations = JSON.stringify(newLocations);
  }

  function setSelectedItem(item) {
    selectedItem = item;
    lastInput = item.display_name;
    inputElement.value = item.display_name;
    addRecentLocation(item);
  }

  return {
    getSelectedItem: function() { return selectedItem; },
    setSelectedItem: setSelectedItem,
  };
}
