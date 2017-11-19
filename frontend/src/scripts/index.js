var angular = require('angular');

var contents = require('./scripts_Module/contents');

var guide = require('./scripts_Module/guide');
var movement = require('./scripts_Module/movement');
var work = require('./scripts_Module/work');
var writing = require('./scripts_Module/writing');
var contactus = require('./scripts_Module/contactus');


var register = require('./scripts_Module/register');
var login = require('./scripts_Module/loginSample');


var contentsModule = 'contents';
module.exports = contentsModule;

angular
  .module(contentsModule, [])
  .component('fountainContents', contents)

  .component('guide', guide)
  .component('movement', movement)
  .component('work', work)
  .component('writing', writing)
  .component('contactus', contactus)

  .component('register', register)
  .component('login', login);


