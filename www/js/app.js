function main() {
  showTemplate('main');
  document.getElementById('button_search').addEventListener('click', function() {
    map();
  });

  var input_begin = document.getElementById('input_begin');
  input_begin.addEventListener('input', function() {
    var fakeResults = [];
    for(var i = 0; i < 10; i++) { fakeResults.push(input_begin.value + ' ' + i); }

    displayAutocompleteResults(input_begin, fakeResults);
  });

  function displayAutocompleteResults(inputElement, results) {
    showAutocomplete(inputElement, results.map(renderItem));

    function renderItem(item) {
      var elem = copyTemplate('autocomplete-item');
      elem.querySelector('.name').innerText = item;
      return elem;
    }
  }
}

function map() {
  showTemplate('map');
  document.getElementById('show-main').addEventListener('click', function() {
    main();
  });
}

main();
