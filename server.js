const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'aleksandra',
    database : 'facebrain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('Hi, i am busy..') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) })

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=> {
  console.log('app is running on port' + PORT);
})