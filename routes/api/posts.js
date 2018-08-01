const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// model
const Post = require('../../models/Post');

// validation
const {
  validatePostInput,
  validateCommentInput
} = require('../../validation/validation');

// @route   GET api/posts/test
// @desc    test post route
// @access  public
router.get('/test', (req, res) => res.json({ message: 'posts test successful' }));

// @route   POST api/posts
// @desc    create post
// @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // validation
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // prep new post
  const newPost = new Post({
    user: req.user.id,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar
  });

  newPost
    .save()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err.message));
});

// @route   PUT api/posts/:post_id
// @desc    update existing post
// @access  private
router.put('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // validation
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const postData = {
    text: req.body.text,
    edited: true
  };

  Post.findOneAndUpdate(
    { user: req.user.id, _id: req.params.post_id },
    { $set: postData },
    { new: true }
  )
    .then(post => {
      return post
        ? res.status(200).json(post)
        : res.status(404).json({ post: 'post not found' });
    })
    .catch(err => {
      res.status(400).json({ post: 'unable to update post' });
    });
});

// @route   DELETE api/posts/:post_id
// @desc    delete post
// @access  private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findOneAndDelete({ user: req.user.id, _id: req.params.post_id })
      .then(post => {
        return post
          ? res.status(200).json(post)
          : res.status(404).json({ post: 'post not found' });
      })
      .catch(err => {
        res.status(400).json({ post: 'unable to delete the post' });
      });
  }
);

// @route   GET api/posts
// @desc    retrieve all posts (sorted by date)
// @access  public
// TODO: implement basic pagination
router.get('/', (req, res) => {
  Post.find()
    .sort({ createdAt: 'desc' })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ posts: 'unable to retrieve posts' }));
});

// @route   GET api/posts/:post_id
// @desc    get specific post (by id)
// @access  public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      return post
        ? res.status(200).json(post)
        : res.status(404).json({ post: 'post not found' });
    })
    .catch(err => res.status(400).json({ post: 'unable to retrieve post' }));
});

// @route   POST api/posts/comment/:post_id
// @desc    add a new comment on a post
// @access  private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;
    const { id: user, name, avatar } = req.user;

    // validation
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newComment = {
      user,
      text: req.body.text,
      name,
      avatar
    };

    Post.findById(post_id)
      .then(post => {
        if (post) {
          // post found
          post.comments.unshift(newComment);
          return post.save();
        }
        // post not found
        return;
      })
      .then(post => {
        return post
          ? res.status(200).json(post)
          : res.status(404).json({ post: 'post not found' });
      })
      .catch(err => {
        console.log(err); // log error
        res.status(400).json({ message: 'an error has occurred' });
      });
  }
);

// @route   PUT api/posts/comment/:post_id/:comment_id
// @desc    edit a comment on a post
// @access  private
router.put(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id, comment_id } = req.params;
    const { id: user, name, avatar } = req.user;

    // validation
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { text } = req.body;

    Post.findById(post_id)
      .then(post => {
        if (post) {
          // post found
          const index = post.comments.findIndex(
            comment =>
              comment.id.toString() === comment_id && comment.user.toString() === user
          );

          // comment found
          if (index > -1) {
            post.comments[index].text = text;
            post.comments[index].edited = true;
            return post.save();
          }

          // comment not found
          return;
        }

        // post not found
        return;
      })
      .then(post => {
        return post
          ? res.status(200).json(post)
          : res.status(404).json({ comment: 'comment not found' });
      })
      .catch(err => {
        console.log(err); // log error
        res.status(400).json({ post: 'invalid request' });
      });
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    delete a comment on a post
// @access  private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id, comment_id } = req.params;
    const { id: user } = req.user;

    if (post_id && comment_id) {
      Post.findById(post_id)
        .then(post => {
          if (post) {
            // post found
            const index = post.comments.findIndex(
              comment =>
                comment.id.toString() === comment_id && comment.user.toString() === user
            );
            // comment found
            if (index > -1) {
              // remove comment
              post.comments.splice(index, 1);
              return post.save();
            }

            // comment not found
            return;
          }

          // post not found
          return;
        })
        .then(post => {
          return post
            ? res.status(200).json(post)
            : res.status(404).json({ comment: 'comment not found' });
        })
        .catch(err => {
          console.log(err); // log error
          res.status(400).json({ post: 'invalid request' });
        });
    } else res.status(400).json({ post: 'invalid request' });
  }
);

// @route   POST api/posts/like/:post_id
// @desc    like a post
// @access  private
// TODO: change schema or return values
//       - likes could simply be a list of user ids (rather than objects)
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;

    Post.findById(post_id)
      .then(post => {
        if (post) {
          if (post.likes.some(like => like.user.toString() === req.user.id)) {
            // already liked
            return post;
          }
          post.likes.unshift({ user: req.user.id });
          return post.save();
        }
        // post not found
        return;
      })
      .then(post => {
        if (post) {
          return res.status(200).json(post);
        }
        res.status(404).json({ post: 'post not found' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ post: 'invalid request' });
      });
  }
);

// @route   POST api/posts/unlike/:post_id
// @desc    unlike a post
// @access  private
// TODO: change schema or return values
//       - likes could simply be a list of user ids (rather than objects)
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { post_id } = req.params;

    Post.findById(post_id)
      .then(post => {
        if (post) {
          // remove like object if found
          const index = post.likes.findIndex(
            like => like.user.toString() === req.user.id
          );
          if (index > -1) {
            // like found
            post.likes.splice(index, 1);
            return post.save();
          }
          // like not found
          return post;
        }
        // post not found
        return;
      })
      .then(post => {
        if (post) {
          return res.status(200).json(post);
        }
        res.status(404).json({ post: 'post not found' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ post: 'invalid request' });
      });
  }
);

module.exports = router;
