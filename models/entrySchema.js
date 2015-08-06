var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
    title: String,
    blurb: String,
    author: String,
    thumbnail_url: String,
    details_url: String,
    blurb_length: Number
});

module.exports = mongoose.model('Entry', entrySchema);