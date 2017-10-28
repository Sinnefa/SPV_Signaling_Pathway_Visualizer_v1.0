<?php
ini_set('memory_limit', '96M');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
set_time_limit(10000);

function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}
function get_current_url() {
	$protocol = 'http';
	if ($_SERVER['SERVER_PORT'] == 443 || (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on')) {
		$protocol .= 's';
		$protocol_port = $_SERVER['SERVER_PORT'];
	} else {
		$protocol_port = 80;
	}

	$host = $_SERVER['HTTP_HOST'];
	$port = $_SERVER['SERVER_PORT'];
	$request = $_SERVER['PHP_SELF'];
	$query = isset($_SERVER['argv']) ? substr($_SERVER['argv'][0], strpos($_SERVER['argv'][0], ';') + 1) : '';

	$toret = $protocol . '://' . $host . ($port == $protocol_port ? '' : ':' . $port) . $request . (empty($query) ? '' : '?' . $query);

	return $toret;
}


//$name=random_string(10).".svg";
$name="tmp/".$_POST['name'].".svg";
//echo "ciao".$_POST['w'];
file_put_contents($name,$_POST['svg'].str_replace("&lt;","<").str_replace("&gt;",">").str_replace("&nbsp;"," "));
exec("/usr/bin/java -Djava.awt.headless=true -jar ".getcwd()."/batik-1.7/batik-rasterizer.jar -w ".($_POST['w']*2)." -h ".($_POST['h']*2)." ".getcwd()."/$name 2>&1 >gatto",$output);
//chmod($_SERVER['PATH_INFO']."".str_replace(".svg",".png",$name),0777);
//echo $_SERVER['PATH_INFO']."".str_replace(".svg",".png",$name);
print_r($output);
?> 
