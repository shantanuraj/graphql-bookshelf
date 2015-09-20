import express from 'express';
import bodyParser from 'body-parser';
import glob from 'glob';

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('./components/Post/routes')(app);
require('./components/User/routes')(app);

app.listen(3000, () => console.log('API up on http://localhost:3000'));
