var superagent = require('superagent');
var expect = require('expect.js');

describe('creating fashion posts', function() {
    var baseUrl = 'http://localhost:8080/entries';

    it('create one fashion post', function(done) {
        superagent.post(baseUrl)
            .send({
                title: 'This is a great post!',
                blurb: 'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!',
                author: 'Saleh Kaddoura',
                thumbnail: 'https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png',
                details: 'www.google.com'
            })

            .end(function(e, res) {
                expect(e).to.eql(null);
                expect(res.body.title).to.eql('This is a great post!');
                expect(res.body.blurb).to.be.a('string');
                expect(res.body.author).to.eql('Saleh Kaddoura');
                expect(res.body.thumbnail_url).to.eql('https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png');
                expect(res.body.details_url).to.eql('http://www.google.com');

                done();
            })
    })

    it('retrieve 20 posts from DB', function(done) {
        superagent.get(baseUrl + '/0')
            .end(function(e, res) {
                expect(res.body.length).to.eql(20);

                done();
            })
    })
})


describe('failure tests', function() {
    var baseUrl = 'http://localhost:8080/entries';

    it('will not create a fashion post', function(done) {
        superagent.post(baseUrl)
            .send({
                blurb: 'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!' +
                        'This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!',
                author: 'Saleh Kaddoura',
                thumbnail: 'https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png',
                details: 'www.google.com'
            })

            .end(function(e, res) {
                expect(e.status).to.eql(400);
                
                done();
            })
    })

    it('will not get 20 posts from DB', function(done) {
        superagent.get(baseUrl)
            .end(function(e, res) {
                expect(e.status).to.eql(404);

                done();
            })
    })
})