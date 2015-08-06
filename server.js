var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Entry = require('./models/entrySchema.js');
var hbs = require('hbs');
var cors = require('cors');
require('./utils/hbsHelpers.js');

var port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/posts', function(req, res) {
    console.log('HELLO!');
    Entry.find().sort({ createdAt: -1 }).limit(20).then(function(data) {
        data.map(function(post, index) {
            if (typeof(post.blurb) !== "undefined") {
                post.blurb = post.blurb.split(" ").splice(0, 32).join(" ");    
            }
        });

        res.render('posts', {
            post: data
        });
    });
})

app.use('/entries', require('./routes/entries'));

app.listen(port);
console.log('Magic happens on port: ' + port);