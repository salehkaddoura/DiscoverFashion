var express = require('express');
var router = express.Router();
var Entry = require('../models/entrySchema.js');

router.get('/:page', function(req, res) {
    var limit = 20;
    var skip = req.params.page * limit;

    Entry.find().sort({ createdAt: -1 }).skip(skip).limit(limit).then(function(data) {
        data.map(function(post, index) {
            post.blurb = post.blurb.split(" ").splice(0, 32).join(" ");
        });

        res.json(data);
    })
});

router.post('/', function(req, res) {
    if (isNull(req.body.title) || isNull(req.body.author) || isNull(req.body.thumbnail)) {
        res.status(400).json({ message: "Required body params are undefined please try again! :) "});
        return;
    }

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

function isNull(checkObject) {
    if (typeof(checkObject) === "undefined" || checkObject == null) {
        return true;
    }
    return false;
}