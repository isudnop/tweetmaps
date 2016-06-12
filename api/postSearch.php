<?php
require_once("../include/config.inc.php");
require_once('../include/twitteroauth.php');

$connection = new TwitterOAuth(configVariables::$TWITTER_CONSUMER_KEY, configVariables::$TWITTER_CONSUMER_SECRET);
//$searh = filter_input(INPUT_GET,"search");
$latitude = filter_input(INPUT_GET,"latitude");
$longitude = filter_input(INPUT_GET,"longitude");
$APIURL ="https://api.twitter.com/1.1/search/tweets.json?q=&geocode={$latitude},{$longitude},2mi&result_type=recent";
//TwitterOAuth not support Streaming API :(
$tweets = $connection->get($APIURL);
foreach($tweets as $tweet){
  break;
}
echo json_encode($tweet);
