//  Config
var config = require('./config');

//  Libraries
var Twitter = require('twitter');
var loki = require('lokijs');
global.Natural = require('natural'),

//  Models
global.Tweet = require('./models/tweet');

//  Core features
var SiriCore = require('./core/siriCore.js');

//  Twitter API
var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

//  DB Setup
var db = new loki(config.database.name);
global.TweetCollection = db.addCollection("tweets", {
    unique: ['id']
});

//  SiriCore init

var main_core = new SiriCore(config,client,TweetCollection);
main_core.start(config.run_status);
