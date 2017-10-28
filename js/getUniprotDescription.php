<?php
$f=file("http://".$_SERVER['SERVER_NAME'].":8080/server/getUniprotDescription?id=".$_GET['id']."&org=all");//.$_COOKIE['org']);
foreach ($f as $r)
	echo str_replace(";","<br>",$r);
?>
