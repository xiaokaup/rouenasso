// js
require('./js/bootstrap.min.js');
require('./js/owl.carousel.min.js');
require('./js/wow.min.js');
require('./js/typewriter.js');
require('./js/main.js');

// css
require('./css/normalize.css');
require('./css/bootstrap.min.css');
require('./css/owl.css');
require('./css/animate.css');
require('./fonts/font-awesome-4.1.0/css/font-awesome.min.css');
require('./fonts/eleganticons/et-icons.css');
require('./css/cardio.css');

require('./styles/index.css');
require('./styles/guide.css');

//favicon
require('./img/favicons/apple-touch-icon.png');
require('./img/favicons/favicon-32x32.png');
require('./img/favicons/favicon-16x16.png');
require('./img/favicons/safari-pinned-tab.svg');
require('./img/favicons/manifest.json');

// angular
var angular = require('angular');
require('angular-ui-router');

var routesConfig = require('./routes');
var contentsModule = require('./scripts/index');

// component
var bigHeader = require('./scripts/scripts_base/BigHeader');
var smallHeader = require('./scripts/scripts_base/SmallHeader');
var footer = require('./scripts/scripts_base/footer');
var main = require('./scripts/main');

require('./styles/index.css');
require('./styles/guide.css');
require('./styles/register.css');


angular
  .module('app', [contentsModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('bigHeader', bigHeader)
  .component('smallHeader', smallHeader)
  .component('fountainFooter', footer);
