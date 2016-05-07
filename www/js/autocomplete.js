(function() {
  var autocompleteNode = null;

  window.showAutocomplete = function showAutocomplete(inputField, contents) {
    var clientRect = inputField.getBoundingClientRect();
    var position = {
      left: clientRect.left + window.scrollX,
      bottom: clientRect.bottom + window.scrollY,
    };

    if(!autocompleteNode) {
      autocompleteNode = document.createElement('div');
      autocompleteNode.style.position = 'absolute';
      autocompleteNode.className = 'autocomplete';
      document.body.appendChild(autocompleteNode);
    }

    autocompleteNode.style.display = '';
    autocompleteNode.style.left = position.left + 'px';
    autocompleteNode.style.top = position.bottom + 'px';
    autocompleteNode.style.minWidth = clientRect.width + 'px';

    clearNode(autocompleteNode);

    contents.forEach(function(element) {
      autocompleteNode.appendChild(element);
    });
  };

  window.hideAutocomplete = function hideAutocomplete() {
    autocompleteNode.style.display = 'none';
  };
})();
