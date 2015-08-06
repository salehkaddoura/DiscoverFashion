# DiscoverFashion
================================

### Create Entry
` POST https://discoverfashion.herokuapp.com/entries `

###### Body
* title - string
* blurb - string
* author - string
* thumbnail - string
* details - string 


###### Sample Response
`{
  "__v": 0,
  "details_url": "http://www.google.com",
  "thumbnail_url": "https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png",
  "author": "Saleh Kaddoura",
  "blurb": "This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!",
  "title": "This is a great post!",
  "_id": "55c30fed5c38db0300fd58cb",
  "createdAt": "2015-08-06T07:42:37.430Z"
}`


### Get Entries
` GET https://discoverfashion.herokuapp.com/entries/:page `

###### Parameters
* page - Number ex(0, 1, 2, 3);


###### Sample Response
`[
  {
    "_id": "55c30fed5c38db0300fd58cb",
    "details_url": "http://www.google.com",
    "thumbnail_url": "https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png",
    "author": "Saleh Kaddoura",
    "blurb": "This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!",
    "title": "This is a great post!",
    "__v": 0,
    "createdAt": "2015-08-06T07:42:37.430Z"
  },
  {
    "_id": "55c30c5325601d0300e38160",
    "details_url": "http://www.google.com",
    "thumbnail_url": "https://41.media.tumblr.com/d23ab082f566e2e20052e4d41860ce3a/tumblr_npdo2vfBgK1st94yco1_540.png",
    "author": "Saleh Kaddoura",
    "blurb": "This is a great blurb that is going to be greater than 32 words this, it is going to be very hard to create a blurb this long OH MY!",
    "title": "This is a great post!",
    "__v": 0,
    "createdAt": "2015-08-06T07:27:15.699Z"
  }
]`

## Using Locally

1. Clone repo & cd DiscoverFashion
2. npm install
3. node server
4. To test cd DiscoverFashion/tests & mocha fashion.test.js 

