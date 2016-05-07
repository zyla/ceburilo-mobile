
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
