const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// utils
const pick = require('lodash/pick');
const forOwn = require('lodash/forOwn');

// app config
const config = require('../../config/appConfig');

// models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// validation
const {
  validateProfileInput,
  validateProjectInput,
  validateResourceInput
} = require('../../validation/validation');

// helpers
function removeProtocol(str) {
  return str.replace(/(^\w+:|^)\/\//, '');
}

// ROUTES
// @route   GET api/profile/test
// @desc    test profile route
// @access  public
router.get('/test', (req, res) =>
  res.json({ user: 'Test User', handle: 'test', focus: 'Testing' })
);

// @route   GET api/profile
// @desc    get current user profile
// @access  private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        // no profile
        errors.profile = 'profile not found for this user';
        return res.status(404).json(errors);
      } else {
        // profile found
        return res.status(200).json(profile);
      }
    })
    .catch(err => {
      return res.status(500).json('an error has occurred');
      console.log('an error has occurred : ', err);
    });
});

// @route   GET api/profile/handle/:handle
// @desc    get current user profile via handle
// @access  public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'profile not found for this user';
        return res.status(404).json(errors);
      }

      return res.status(200).json(profile);
    })
    .catch(err => {
      errors.message = 'an error has occurred';
      console.log(err);
      return res.status(500).json(error);
    });
});

// @route   GET api/profile/user/:userid
// @desc    get current user profile via user id
// @access  public
router.get('/user/:userid', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.userid })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'profile not found for this user';
        console.log(errors);
        res.status(404).json(errors);
      }

      return res.status(200).json(profile);
    })
    .catch(err => {
      errors.id = 'invalid format'; // may be better as 404 on error.profile
      console.log(err.message);
      res.status(400).json(errors);
    });
});

// @route   GET api/profile/all
// @desc    get all profiles
// @access  public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (profiles.length === 0 || !profiles) {
        errors.profile = 'no profiles found';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      errors.message = 'invalid format'; // may be better as 404 on error.profile
      console.log(err);
      res.status(400).json(errors);
    });
});

// @route   POST api/profile
// @desc    create or update profile for current (authorized) user
// @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // input validation
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // create new profile data obj & retrieve input data
  const profileData = pick(req.body, [
    'handle',
    'employer',
    'website',
    'location',
    'focus',
    'skills',
    'bio'
  ]);

  // add id
  profileData.user = req.user.id;

  // add skills
  if (req.body.skills) {
    profileData.skills = req.body.skills.split(',').map(skill => skill.trim());
  }

  // add social
  profileData.social = pick(req.body, ['github', 'youtube', 'twitter', 'linkedin']);
  // remove protocol from social links
  forOwn(profileData.social, function(val, key, obj) {
    obj[key] = removeProtocol(val);
  });

  // remove protocol from website
  if (profileData.website) profileData.website = removeProtocol(profileData.website);

  // send updates
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // profile found - update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        )
          .then(profile => res.status(200).json(profile))
          .catch(err => res.status(500).json({ message: err.message }));
      } else {
        //profile not found - create new profile
        // check for existing handle
        Profile.findOne({ handle: profileData.handle }).then(profile => {
          if (profile) {
            // handle already exists
            errors.handle = 'that handle already exists';
            return res.status(400).json(errors);
          } else {
            // save profile
            new Profile(profileData)
              .save()
              .then(profile => res.status(200).json(profile));
          }
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

// @route   DELETE api/profile/
// @desc    remove a user & profile
// @access  private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => User.findOneAndRemove({ _id: req.user.id }))
    .then(() => res.json({ message: 'user and profile deleted' }))
    .catch(err => res.status(400).json(err.message));
});

// @route   POST api/profile/projects
// @desc    add a project to profile
// @access  private
router.post('/projects', passport.authenticate('jwt', { session: false }), (req, res) => {
  // input validation
  const { errors, isValid } = validateProjectInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // create new project
        const newProject = pick(req.body, [
          'title',
          'description',
          'url',
          'repo',
          'from',
          'to',
          'current'
        ]);

        // create keyword array (from string)
        if (req.body.keywords) {
          newProject.keywords = req.body.keywords
            .split(',')
            .map(keyword => keyword.trim());
        }

        // remove protocol from urls
        if (newProject.url) newProject.url = removeProtocol(newProject.url);
        if (newProject.repo) newProject.repo = removeProtocol(newProject.repo);

        // merge with projects array
        profile.projects = profile.projects.concat(newProject);
        // profile.projects.unshift(newProject);  // adds to front of the array

        // save profile
        return profile.save();
      }

      // profile not found
      return;
    })
    .then(profile => {
      return profile
        ? res.status(200).json(profile)
        : res.status(404).json({ profile: 'profile not found' });
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).json('invalid request');
    });
});

// @route   GET api/profile/projects/:project_id
// @desc    retrieve an existing project by id
// @access  private
router.get(
  '/projects/:project_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { project_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // find project
          const project = profile.projects.id(project_id);

          return project
            ? res.status(200).json(project)
            : res.status(404).json({ project: 'resource not found' });
        }

        // profile not found
        return res.status(404).json({ profile: 'profile not found' });
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json({ profile: 'invalid request' });
      });
  }
);

// @route   PUT api/profile/projects/:project_id
// @desc    edit an existing project
// @access  private
router.put(
  '/projects/:project_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // input validation

    console.log(req.body);

    const { errors, isValid } = validateProjectInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { project_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // find project
          const project = profile.projects.id(project_id);

          if (project) {
            // prep resource update
            // create new project
            const updatedProject = pick(req.body, [
              'title',
              'description',
              'url',
              'repo',
              'from',
              'to',
              'current'
            ]);

            // create keyword array (from string)
            if (req.body.keywords) {
              updatedProject.keywords = req.body.keywords
                .split(',')
                .map(keyword => keyword.trim());
            }

            // remove protocol from urls
            if (updatedProject.url)
              updatedProject.url = removeProtocol(updatedProject.url);
            if (updatedProject.repo)
              updatedProject.repo = removeProtocol(updatedProject.repo);

            // merge back into resource array
            Object.assign(project, updatedProject);

            // save profile
            return profile.save();
          }
          //   project not found
          errors.project = 'project not found';
          return;
        }
        // profile not found
        errors.profile = 'profile not found';
        return;
      })
      .then(profile => {
        return profile ? res.status(200).json(profile) : res.status(404).json(errors);
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json({ profile: 'invalid request' });
      });
  }
);

// @route   DELETE api/profile/projects/:project_id
// @desc    remove a project from profile
// @access  private
router.delete(
  '/projects/:project_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const { project_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          const newProjectsArr = profile.projects.filter(
            project => project.id !== project_id
          );

          if (newProjectsArr.length !== profile.projects.length) {
            // resource found and removed
            profile.projects = newProjectsArr;
            // save edited profile
            return profile.save();
          }
          // project not found (array length unchanged)
          // - could also use lodash isEqual() for deep comparison if desired
          return profile;
        }
        // profile not found
        errors.profile = 'profile not found';
        return;
      })
      .then(profile => {
        return profile ? res.status(200).json(profile) : res.status(404).json(errors);
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json('invalid request');
      });
  }
);

// @route   POST api/profile/resources
// @desc    add a resource to profile
// @access  private
router.post(
  '/resources',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // input validation
    const { errors, isValid } = validateResourceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // create new resource
          const newResource = pick(req.body, ['name', 'topic', 'description', 'url']);

          // create keyword array (from string)
          if (req.body.keywords) {
            newResource.keywords = req.body.keywords
              .split(',')
              .map(keyword => keyword.trim());
          }

          // remove protocol from urls
          if (newResource.url) newResource.url = removeProtocol(newResource.url);

          // merge with resource array
          profile.resources = profile.resources.concat(newResource);

          // save profile
          return profile.save();
        }
        // profile not found
        errors.profile = 'profile not found';
        return;
      })
      .then(profile => {
        return profile ? res.status(200).json(profile) : res.status(404).json(errors);
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json('invalid request');
      });
  }
);

// @route   GET api/profile/resources/:resourceid
// @desc    retrieve an existing resource
// @access  private
router.get(
  '/resources/:resource_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { resource_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // find resource
          const resource = profile.resources.id(resource_id);

          return resource
            ? res.status(200).json(resource)
            : res.status(404).json({ resource: 'resource not found' });
        }

        // profile not found
        return res.status(404).json({ profile: 'profile not found' });
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json({ profile: 'invalid request' });
      });
  }
);

// @route   PUT api/profile/resources/:resourceid
// @desc    edit an existing resource
// @access  private
router.put(
  '/resources/:resource_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // input validation
    const { errors, isValid } = validateResourceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { resource_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // find resource
          const resource = profile.resources.id(resource_id);

          if (resource) {
            // prep resource update
            const updatedResource = pick(req.body, [
              'name',
              'topic',
              'description',
              'url'
            ]);

            // create keyword array (from string)
            if (req.body.keywords) {
              updatedResource.keywords = req.body.keywords
                .split(',')
                .map(keyword => keyword.trim());
            }

            // remove protocol from urls
            if (updatedResource.url)
              updatedResource.url = removeProtocol(updatedResource.url);

            // merge back into resource array
            Object.assign(resource, updatedResource);

            // save profile
            return profile.save();
          }
          //   resource not found = reject promise?
          errors.resource = 'resource not found';
        }
        // profile not found
        errors.profile = 'profile not found';
        return;
      })
      .then(profile => {
        return profile ? res.status(200).json(profile) : res.status(404).json(errors);
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json({ profile: 'invalid request' });
      });
  }
);

// @route   DELETE api/profile/resources/:resource_id
// @desc    remove a resource from profile
// @access  private
router.delete(
  '/resources/:resource_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const { resource_id } = req.params;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // const resourcesLength = profile.resources.length;
          // profile.resources.remove({ _id: resource_id });
          // if (resourcesLength === profile.resources.length) return profile.save();
          // return profile;

          const newResourcesArr = profile.resources.filter(
            resource => resource.id !== resource_id
          );

          if (newResourcesArr.length !== profile.resources.length) {
            // resource found and removed
            profile.resources = newResourcesArr;
            // save edited profile
            return profile.save();
          }
          // resource not found (resources array length unchanged)
          // - could also use lodash isEqual() for deep comparison if desired
          return profile;
        }
        return;
      })
      .then(profile => {
        return profile
          ? res.status(200).json(profile)
          : res.status(404).json('resource not found');
      })
      .catch(err => {
        console.log(err.message);
        res.status(400).json('invalid request');
      });
  }
);

module.exports = router;
