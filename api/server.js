const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv for environment variables
dotenv.config();


const userController = require('./Controller/UserController');
const foodTypeController = require('./Controller/FoodTypeController');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.post('/api/user/signin', (req, res) => {
    userController.signIn(req, res);
});

app.post('/api/FoodType/create', (req, res) => {
    foodTypeController.create(req, res);
})
app.get('/api/foodType/list', (req, res) => {
    foodTypeController.list(req, res);
});

app.delete('/api/foodType/remove/:id', (req, res) => {
    foodTypeController.remove(req, res);
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
