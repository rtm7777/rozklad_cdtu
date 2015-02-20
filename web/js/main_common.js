window.$ = window.jQuery = require('jquery');
import "bootstrap";
import "./libs/socketEvents";
import {getValue} from "./services/localStorage";

console.log(getValue("lala"));

var _ = require('underscore');


_.each([1, 2, 3], function (n) {
  console.log(n); //=> 1, 2, 3
});