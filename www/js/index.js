var templates = initTemplates();

function initTemplates() {
  var templates = {};

  var templatesNode = document.getElementById('templates');
  [].forEach.call(templatesNode.childNodes, function(element) {
    templates[element.id] = element;
  });

  templatesNode.parentNode.removeChild(templatesNode);

  return templates;
}

function showTemplate(name) {
  var template = templates[name];

  if(!template) {
    throw new Error('Template not found: ' + name);
  }

  var appNode = document.getElementById('app');
  appNode.innerHTML = '';
  appNode.appendChild(template.cloneNode(true));
}

function main() {
  showTemplate('main');
  document.getElementById('button_search').addEventListener('click', function() {
    map();
  });
}

function map() {
  showTemplate('map');
  document.getElementById('show-main').addEventListener('click', function() {
    main();
  });
}

main();
