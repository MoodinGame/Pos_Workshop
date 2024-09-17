const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./Controller/UserController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/user/signin', (req, res) => {
    userController.signIn(req, res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
