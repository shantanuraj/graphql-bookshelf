import express from 'express';
import bodyParser from 'body-parser';
import glob from 'glob';

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const routes = glob.sync('./src/components/**/routes.es6');
routes.forEach(route => require(route)(app));

app.listen(3000, () => console.log('API up on http://localhost:3000\n'));
