window.$ = window.jQuery = require('jquery');
import "bootstrap";
import "./libs/socketEvents";
import "./controllers/initController";
import DBApp from  "./controllers/initDBController";

let state;
let app;

if (document.getElementById('page').dataset.id == "database") {
	app = new DBApp(state);
	app.renderToDOM(document.getElementById('database'));
}
