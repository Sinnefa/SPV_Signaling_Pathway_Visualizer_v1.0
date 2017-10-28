<?php
$f=file("http://".$_SERVER['SERVER_NAME'].":8080/server/getEvidence?ida=".$_GET['ida']."&idb=".$_GET['idb']."&org=".$_GET['org']);
foreach ($f as $r)
	echo $r;
?>
