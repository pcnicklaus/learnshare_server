const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShareSchema = new Schema(
  {
    title:        { type: String },
    name:         { type: String },
    description:  { type: String },
    keywords:     { type: String },
    videoURL:     { type: String }
  },
  {
    timestamps: true
  }
);

const Share = mongoose.model('share', ShareSchema);

module.exports = Share;
