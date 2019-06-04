// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// Dummie database
const database = {
    distributors : [
        {
            id: '001',
            name: 'ajoke',
            location: 'lagos',
            email: 'ajoke@mail.com',
            password: 'password'
        },
        {
            id: '002',
            name: 'basrose',
            location: 'lagos',
            email: 'bas@mail.com',
            password: 'password'
        }
    ]
};

// routes
app.get('/', (req, res) => {
    res.send('<h1>This is eDistributor Landing Page, you may now procees by signing in or signup</h1>');
});

app.post('/signin', (req, res) => {
    // if login is successfull move on to dashboard, else show error message
    if(req.body.name === database.distributors[0].name &&
        req.body.password === database.distributors[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('error logging in');
        }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    database.distributors.push({
        id: '003',
        name,
        location: 'lagos',
        email,
        password
    });

    res.json(database.distributors[database.distributors.length - 1]);
});

app.get('/all', (req, res) => {
    res.json(database.distributors);
});

app.get('/distributors/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.distributors.forEach((distributor) => {
        if(distributor.id === id) {
            found = true;
            return res.json(distributor);
        }
    })
    if(!found) {
        res.status(404).json('Distributor not found');
    }
});




// Start server
app.listen(3000, () => {
    console.log('app listening on port 3000')
});


/*
@TODOS
/ --> res = Landing Page
/signin --> POST req = success/fail
/register --> POST req = create user account
/


*/