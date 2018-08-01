// imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// config
const config = require('./config/appConfig');
const db = config.getMongoURI();
const port = config.getPort();

// import routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log(`db connected`))
  .catch(err => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// auth middleware - passport config
app.use(passport.initialize());
require('./config/passportConfig')(passport);

// routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// static assets (client)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`server running on port ${port}`));
