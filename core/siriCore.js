function SiriCore(config,client){
  this.stream = null;
  this.isHard = false;
  this.trends = {};

  this.start = function(status){
    this.isHard = status === 'HARD';
    this.client = client;
    this.stream = client.stream('statuses/filter', {track: '#lka'});
    this.stream.on('data',this.onData.bind(this));
    this.stream.on('error', this.onError.bind(this));
  }

  this.doTrends = function(t){
    for (var key in t.tags) {
      if (this.trends[t.tags[key]] == undefined) {
        this.trends[t.tags[key]] = 0;
      }else{
        this.trends[t.tags[key]] = this.trends[t.tags[key]] + 1;
      }
    }

    var tlist = Object.keys(this.trends);
    for (var key in tlist) {
      console.log(tlist[key]+" --> "+this.trends[tlist[key]]);
    }
  }

  this.onData = function(tweet){
    var t = new Tweet(tweet)
    TweetCollection.insert(t);
    console.log("Saved Tweet by "+t.user.handle);
    this.doTrends(t);
  }

  this.onError = function(error){
      console.error("Streaming error " + error);
  }
}

module.exports = SiriCore;
