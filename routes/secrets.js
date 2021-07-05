const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Secret = require('../models/Secret');

// @route   GET api/secrets
// @desc    Get user all secrets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const secrets = await Secret.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(secrets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/secrets/:id
// @desc    Get a secret
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const secret = await Secret.findById(req.params.id);
    res.json(secret);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/secrets
// @desc    Add new secret
// @access  Private
router.post(
  '/',
  [auth, [check('secretText', 'Secret is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { secretText, views, expire, hash } = req.body;

    try {
      const newSecret = new Secret({
        secretText,
        views,
        expire,
        hash,
        user: req.user.id,
      });

      const secret = await newSecret.save(); // this will save the secret instance to the database

      res.json(secret);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/secrets/:id
// @desc    Update a secret
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { secretText, views, expire, hash } = req.body;

  // Build a secret object
  const secretFields = {};
  if (secretText) secretFields.secretText = secretText;
  if (views) secretFields.views = views;
  if (expire) secretFields.expire = expire;
  if (hash) secretFields.hash = hash;

  try {
    let secret = await Secret.findById(req.params.id);
    if (!secret) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    // Make sure user owns secret
    if (secret.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    // Now make the actual update
    secret = await Secret.findByIdAndUpdate(
      req.params.id,
      { $set: secretFields },
      { new: true }
    );

    res.json(secret);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/secrets/:id
// @desc    Delete a secret
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let secret = await Secret.findById(req.params.id);
    if (!secret) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    // Make sure user owns secret
    if (secret.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    await Secret.findByIdAndRemove(req.params.id);

    res.json({ message: 'Secret Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
