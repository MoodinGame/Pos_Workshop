const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv for environment variables
dotenv.config();


const userController = require('./Controller/UserController');
const foodTypeController = require('./Controller/FoodTypeController');
const foodSizeController = require('./Controller/FoodSizeController');
const tasteController = require('./Controller/TasteController');
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

app.put('/api/foodType/update', (req, res) => {
    foodTypeController.update(req, res);
})

app.delete('/api/foodType/remove/:id', (req, res) => {
    foodTypeController.remove(req, res);
})

app.post('/api/foodSize/create', (req, res) => {
    foodSizeController.create(req, res);
})

app.get('/api/foodSize/list', (req, res) =>{
    foodSizeController.list(req, res);
});

app.delete('/api/foodSize/remove/:id', (req, res) => {
    foodSizeController.remove(req, res);
})

app.put('/api/foodSize/update', (req, res) => {
   foodSizeController.update(req, res);
});

app.post('/api/taste/create', (req, res) => {
    tasteController.create(req, res);
})

app.get('/api/taste/list', (req, res) => {
    tasteController.list(req, res);
});

app.delete('/api/taste/remove/:id', (req, res) => {
    tasteController.remove(req, res);
})

app.put('/api/taste/update', (req, res) =>{
    tasteController.update(req, res);
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
