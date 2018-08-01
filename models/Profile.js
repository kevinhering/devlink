const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  handle: {
    type: String,
    unique: true,
    required: true,
    maxlength: 40
  },
  employer: {
    type: String
  },
  website: {
    type: String,
    validate: {
      isAsync: false,
      validator: validator.isURL,
      message: '{VALUE} is not a valid URL'
    }
  },
  location: {
    type: String
  },
  focus: {
    type: String,
    required: true
  },
  skills: {
    type: [Array]
  },
  bio: {
    type: String
  },
  projects: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      url: {
        type: String
      },
      repo: {
        type: String,
        required: true
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: true
      },
      keywords: {
        type: [Array]
      }
    }
  ],
  resources: [
    {
      name: {
        type: String,
        required: true
      },
      topic: {
        type: String
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: Date
      },
      url: {
        type: String,
        required: true
      },
      keywords: {
        type: [Array]
      }
    }
  ],
  social: {
    github: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
