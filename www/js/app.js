function main() {
  showTemplate('main');
  document.getElementById('button_search').addEventListener('click', function() {
    map();
  });

  var input_begin = document.getElementById('input_begin');
  installLocationAutocomplete(input_begin);

  var input_end = document.getElementById('input_end');
  installLocationAutocomplete(input_end);
}

function installLocationAutocomplete(inputElement) {
  inputElement.addEventListener('focus', triggerSearch);
  inputElement.addEventListener('input', triggerSearch);
  inputElement.addEventListener('blur', hideAutocomplete);

  function triggerSearch() {
    var fakeResults = [];
    for(var i = 0; i < 10; i++) { fakeResults.push({ name: inputElement.value + ' ' + i }); }

    displayAutocompleteResults(fakeResults);
  }

  function displayAutocompleteResults(results) {
    showAutocomplete(inputElement, results.map(renderItem));

    function renderItem(item) {
      var elem = copyTemplate('autocomplete-item');
      elem.querySelector('.name').innerText = item.name;

      // HACK: 'click' is handled after 'blur', so this has to be 'mousedown'
      elem.addEventListener('mousedown', function() {
        itemSelected(item);
        hideAutocomplete();
      });
      return elem;
    }
  }

  function itemSelected(item) {
    console.log(inputElement.id + ' item selected:', item);
  }
}

function map() {
  showTemplate('map');
  document.getElementById('show-main').addEventListener('click', function() {
    main();
  });
}

main();
