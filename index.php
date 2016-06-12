<?
require_once("include/config.inc.php");
require_once('include/twitteroauth.php');
require("include/Mustache/Autoloader.php");
Mustache_Autoloader::register();
$m = new Mustache_Engine(array(
		'loader' => new Mustache_Loader_FilesystemLoader("templates"),
		'partials_loader' => new Mustache_Loader_FilesystemLoader("templates/partials")
));
$data = array();
$data['map_api_key'] = configVariables::$GOOGLEMAP_APIKEY;
echo $m->loadTemplate("home")->render($data);
?>
