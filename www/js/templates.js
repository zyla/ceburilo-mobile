(function() {
  var templates = {};

  var templatesNode = document.getElementById('templates');
  [].forEach.call(templatesNode.childNodes, function(element) {
    if(element instanceof HTMLElement) {
      templates[element.attributes.getNamedItem('data-template-name').value] = element;
    }
  });

  templatesNode.parentNode.removeChild(templatesNode);

  window.showTemplate = function showTemplate(name) {
    var template = templates[name];

    if(!template) {
      throw new Error('Template not found: ' + name);
    }

    var appNode = document.getElementById('app');
    appNode.innerHTML = '';
    appNode.appendChild(template.cloneNode(true));
  }
})();
