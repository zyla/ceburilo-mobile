(function() {
  var autocompleteNode = null;

  window.showAutocomplete = function showAutocomplete(inputField, contents) {
    var bounds = inputField.getBoundingClientRect();

    if(!autocompleteNode) {
      autocompleteNode = document.createElement('div');
      autocompleteNode.style.position = 'absolute';
      autocompleteNode.className = 'autocomplete';
      document.body.appendChild(autocompleteNode);
    }

    autocompleteNode.style.left = bounds.left + 'px';
    autocompleteNode.style.top = bounds.bottom + 'px';
    autocompleteNode.style.minWidth = bounds.width + 'px';

    clearNode(autocompleteNode);

    contents.forEach(function(element) {
      autocompleteNode.appendChild(element);
    });
  }
})();
