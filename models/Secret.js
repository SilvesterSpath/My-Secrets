const mongoose = require('mongoose');

const SecretSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  secretText: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
  views: {
    type: Number,
    required: true,
  },
  expire: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('secret', SecretSchema);
