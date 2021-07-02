const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get user all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/contacts/:id
// @desc    Get a contact
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [auth, [check('secret', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { secret, views, expire, hash } = req.body;

    try {
      const newContact = new Contact({
        secret,
        views,
        expire,
        hash,
        user: req.user.id,
      });

      const contact = await newContact.save(); // this will save the contact instance to the database

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { secret, views, expire, hash } = req.body;

  // Build a contact object
  const contactFields = {};
  if (secret) contactFields.secret = secret;
  if (views) contactFields.views = views;
  if (expire) contactFields.expire = expire;
  if (hash) contactFields.expire = hash;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    // Now make the actual update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ message: 'Secret Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
