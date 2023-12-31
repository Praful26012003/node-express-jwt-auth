const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/jwtAuth', {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex:true})
  .then((result) => app.listen(3000))
  .catch((err)=>console.log(err));



// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
