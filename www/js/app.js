function main() {
  showTemplate('main');

  var input_begin = locationAutocompleteWidget(document.getElementById('input_begin'));
  var input_end = locationAutocompleteWidget(document.getElementById('input_end'));

  document.getElementById('button_search').addEventListener('click', function() {
    console.log('begin:', input_begin.getSelectedItem());
    console.log('end:', input_end.getSelectedItem());
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

function map() {
  showTemplate('map');
  document.getElementById('show-main').addEventListener('click', function() {
    main();
  });
}

main();
