<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
	<title>Maestro</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700' rel='stylesheet' type='text/css'>
</head>
<body>
<audio class="player-core" onended="nextTrack();">
  <source class="player-src" src="" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<div class="top-bar">
	<div class="menu-button">
		<i class="fa fa-bars"></i>
	</div>
	<div class="section-title">My Music</div>
</div>
<div class="overlay"></div>
<div class="left-menu">
	<div class="logo">
		<i class="fa fa-headphones"></i>Maestro
	</div>
	<ul>
		<li id="my-music">My Music</li>
		<li id="populars">Populars</li>
	</ul>
</div>
<div class="track-list">
	<div class="track">Loading...</div>
</div>
<div class="player-bar">
	<div class="controls-container">
		<div class="controls">
			<div class="prev-track"><i class="fa fa-fast-backward"></i></div>
			<div class="play"><i class="fa fa-play"></i></div>
			<div class="next-track"><i class="fa fa-fast-forward"></i></div>
		</div>
	</div>
</div>
<script src="js/jquery-2.2.1.min.js"></script>
<script src="js/scroll.js"></script>
<script src="js/main.js"></script>
<script type="text/javascript">
	<?php echo 'setToken("'.$_SESSION['access_token'].'","'.$_SESSION['vk_id'].'");' ?>
</script>
</body>
</html>