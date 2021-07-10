const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  attendees: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },

  finished: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('event', EventSchema);
