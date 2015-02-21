window.$ = window.jQuery = require('jquery');
import "bootstrap";
import "./libs/socketEvents";
import "./views/contentView";
import {getValue} from "./services/localStorage";

console.log(getValue("lala"));

import _ from 'underscore';


_.each([1, 2, 3], function (n) {
  console.log(n); //=> 1, 2, 3
});