<?php session_start(); 
	if( !isset($_SESSION['access_token'])){
		header("Location: login.php");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Maestro</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700' rel='stylesheet' type='text/css'>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style type="text/css">
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-button {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-thumb {
  background: #494949;
  border: 0px none #ffffff;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb:hover {
  background: #16a085;
}
::-webkit-scrollbar-thumb:active {
  background: #4d4d4d;
}
::-webkit-scrollbar-track {
  background: #171717;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #171717;
}
::-webkit-scrollbar-track:active {
  background: #171717;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
</head>
<body>
<audio class="player-core" onended="nextTrack();">
  <source class="player-src" src="" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<div class="artist-cover"></div>
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
    <div class="search-container">
        <input class="search-input" type="text" autocomplete="off" name="search-input" placeholder="Search">
        <label class="search-label" for="search-input"><i class="fa fa-search"></i></label>
    </div>
	<ul>
		<li id="my-music">My Music</li>
		<li id="populars">Populars</li>
		<li id="recommendations">Recommendations</li>
		<li class="disabled">Friends</li>
	</ul>
	<div class="friends">
		<ul class="main-menu"></ul>
		<div class="friends-overlay"></div>
		<div class="friends-overlay bottom"></div>
	</div>
	<div class="profile-content">
		<img class="profile-photo" src="<?php echo $_SESSION['vk_photo']; ?>">
		<div class="profile-first-name"><?php echo $_SESSION['vk_name']; ?></div>
		<a href="login.php?logout=1"><div class="profile-last-name">Logout</div></a>
	</div>
</div>
<div class="main-container">
	<div class="track-list">
		<div class="track">Loading...</div>
	</div>
</div>
<div class="player-bar">
	<div class="controls-container">
		<div class="controls">
			<div class="prev-track"><i class="fa fa-fast-backward"></i></div>
			<div class="play"><i class="fa fa-play"></i></div>
			<div class="next-track"><i class="fa fa-fast-forward"></i></div>
		</div>
	</div>
	<div class="track-credits">Artist - Title</div>
	<div class="track-infos">
		<div class="current-time">0:00</div>
		<div class="duration-time">0:00</div>
	</div>
	<div id="tracker"></div>
</div>
<div class="lyrics-overlay">
	<div class="lyrics-window"></div>
</div>
<script src="js/jquery-2.2.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/main.js"></script>
<script type="text/javascript">
	<?php echo 'setToken("'.$_SESSION['access_token'].'","'.$_SESSION['vk_id'].'");' ?>
</script>
</body>
</html>