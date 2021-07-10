const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/events
// @desc     Create an event
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required'),
  check('start', 'Start date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.end ? value < req.body.end : true))
    .not()
    .isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newEvent = new Event({
        text: req.body.text,
        start: req.body.start,
        end: req.body.end,
        title: req.body.title,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/events
// @desc     Get all events
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/events/:id
// @desc     Get event by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/events/:id
// @desc     Delete a event
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.remove();

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/events/attend/:id
// @desc     Attend a post
// @access   Private
router.put('/attend/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already been liked
    if (event.attend.some(attend => attend.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Event already attended' });
    }

    event.attend.unshift({ user: req.user.id });

    await event.save();

    return res.json(event.attend);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/events/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unattend/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/events/comment/:id
// @desc     Comment on a event
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const event = await Event.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      event.comments.unshift(newComment);

      await event.save();

      res.json(event.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/events/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Pull out comment
    const comment = event.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    event.comments = event.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await event.save();

    return res.json(event.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
