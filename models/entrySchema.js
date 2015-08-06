var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
    title: String,
    blurb: String,
    author: String,
    thumbnail_url: String,
    details_url: String,
    createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Entry', entrySchema);