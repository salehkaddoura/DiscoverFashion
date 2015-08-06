var express = require('express');
var router = express.Router();
var Entry = require('../models/entrySchema.js');

router.get('/:page', function(req, res) {
    console.log(req.params.page);
    var limit = 20;
    var skip = req.params.page * limit;

    Entry.find().skip(skip).limit(limit).then(function(data) {
        data.map(function(post, index) {
            post.blurb = post.blurb.split(" ").splice(0, 32).join(" ");
        });

        res.json(data);
    })
});

router.post('/', function(req, res) {
    // var blurb = req.body.blurb.split(" ");
    var details = req.body.details;
    if (details.substring(0, 4) !== 'http') {
        details = 'http://' + details;
    }

    var newEntry = new Entry();

    newEntry.title = req.body.title;
    newEntry.blurb = req.body.blurb;
    newEntry.author = req.body.author;
    newEntry.thumbnail_url = req.body.thumbnail;
    newEntry.details_url = details;
    // newEntry.blurb_length = blurb.length;

    newEntry.save(function(err) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(newEntry);
            res.json(newEntry);
        }
    });
});

module.exports = router;