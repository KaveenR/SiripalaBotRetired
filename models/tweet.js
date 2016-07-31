function Tweet(tweet){
  this.id = tweet.id;
  this.text = tweet.text;
  this.user = {
    id : tweet.user.id,
    name : tweet.user.name,
    handle : tweet.user.screen_name,
    followers : tweet.user.followers_count
  }
  this.tags = [];
  
  for (var id in tweet.entities.hashtags) {
    this.tags.push(tweet.entities.hashtags[id].text);
  }
}

module.exports = Tweet;
