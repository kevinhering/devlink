const _ = require('lodash/core');
const router = require('express').Router();
const passport = require('passport');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// app config
const config = require('../../config/appConfig');

// models
const User = require('../../models/User');

// validation
const {
  validateRegistrationInput,
  validateLoginInput
} = require('../../validation/validation');

// ROUTES

// @route   GET api/users/test
// @desc    test the users route
// @access  public
router.get('/test', (req, res) => res.json({ message: 'users test successful' }));

// @route   GET api/users/register
// @desc    register a user
// @access  public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'An account has already been registered with this email';
        return res.status(400).json(errors);
      } else {
        // create gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        // hash pwd
        // TODO: pull hashing out to middleware (user model for save events)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(req.body.password, salt))
          .then(hash => {
            // save new user
            return new User({
              name: req.body.name,
              email: req.body.email,
              avatar,
              password: hash
            })
              .save()
              .then(user => res.json(_.pick(user, ['id', 'name', 'email', 'avatar'])))
              .catch(err => console.log(err));
          })
          .catch(err => res.status(400).send(err.message));
      }
    })
    .catch(err => res.status(400).send(err.message));
});

// @route   GET api/users/login
// @desc    login & recieve JWT
// @access  public
router.post('/login', (req, res) => {
  // validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      // account found, check pwd
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              // pwd mismatch
              errors.message = 'invalid username or password';
              return res.status(400).json(errors);
            }
            // sign & send jwt
            const payload = { id: user.id, name: user.name, avatar: user.avatar };

            jwt.sign(payload, config.getKey(), { expiresIn: '10h' }, (err, token) => {
              // NOTE: rudimentary auth - not suggested for prod!
              if (err) return console.log(err);
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          })
          .catch(err => console.log(err));
      }

      // user not found
      errors.message = 'invalid username or password';
      return res.status(404).json(errors);
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    return current user (using stateless jwt)
// @access  private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: 'token received' });
});

module.exports = router;
