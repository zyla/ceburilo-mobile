window.addEventListener('hashchange', loadRoute);

function loadRoute() {
  var path = location.hash.replace(/^#/, '');

  // only to make back button work
  if(path == '') {
    main();
  }
}

function changePath(path) {
  location.hash = '#' + path;
}
