$('.menu-button').click(function(){
	$('.left-menu').addClass('open');
	$('.overlay').fadeIn();
});
$('.overlay').click(function(){
	$(this).fadeOut();
	$('.left-menu').removeClass('open');
});
var accessToken;
var vkID;
var player = $('.player-core');
var playerSrc = $('.player-src');
var currentAudioId = '';
function setToken(token, id){
	accessToken = token;
	vkID = id;
}
player[0].addEventListener('timeupdate',function (){
    var curtime = parseInt(player[0].currentTime, 10);
    var time = curtime;
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	if( seconds < 10 ){ seconds = '0'+seconds }
	time = minutes+':'+seconds;
    $('.current-time').html(time);
    $( "#tracker" ).slider( "value", curtime );
});
function getPopulars(){
	$('.track-list').fadeOut('fast');
	$('.section-title').text('Populars');
	$.ajax({
		url: 'https://api.vk.com/method/audio.getPopular',
		type: 'GET',
		data: 'genre_id=1&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.track-list').fadeIn('fast');
			$('.track-list').empty();
			for(i = 0; i < resp.response.length; i++){
				var time = resp.response[i].duration;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				if( seconds < 10 ){ seconds = '0'+seconds }
				var time = minutes+':'+seconds;
				if( resp.response[i].aid == currentAudioId ){
					activeAudio = 'active';
				}else{
					activeAudio = '';
				}
				$('.track-list').append('<div class="track '+activeAudio+'" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" dur="'+resp.response[i].duration+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><b>'+resp.response[i].artist+'</b> - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
			}
		}
	});
}
function getMyMusic(){
	$('.track-list').fadeOut('fast');
	$('.section-title').text('My Music');
	$.ajax({
		url: 'https://api.vk.com/method/audio.get',
		type: 'GET',
		data: 'owner_id='+vkID+'&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.track-list').fadeIn('fast');
			$('.track-list').empty();
			for(i = 1; i < resp.response.length; i++){
				var time = resp.response[i].duration;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				if( seconds < 10 ){ seconds = '0'+seconds }
				var time = minutes+':'+seconds;
				if( resp.response[i].aid == currentAudioId ){
					activeAudio = 'active';
				}else{
					activeAudio = '';
				}
				$('.track-list').append('<div class="track '+activeAudio+'" aid="'+resp.response[i].aid+'" lyrics="'+resp.response[i].lyrics_id+'" artist="'+resp.response[i].artist+'" dur="'+resp.response[i].duration+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><b>'+resp.response[i].artist+'</b> - '+resp.response[i].title+'<div class="duration"><i class="fa fa-file-text-o"></i><i class="fa fa-plus"></i>'+time+'</div></div>');
			}
		}
	});
}
function getFriendsMusic(friend_id, friend_name){
	$('.track-list').fadeOut('fast');
	$('.section-title').text(friend_name + "'s playlist");
	$.ajax({
		url: 'https://api.vk.com/method/audio.get',
		type: 'GET',
		data: 'owner_id='+friend_id+'&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.track-list').fadeIn('slow');
			$('.track-list').empty();
			if( typeof(resp.error) === 'undefined' ){
				for(i = 1; i < resp.response.length; i++){
					var time = resp.response[i].duration;
					var minutes = Math.floor(time / 60);
					var seconds = time - minutes * 60;
					if( seconds < 10 ){ seconds = '0'+seconds }
					var time = minutes+':'+seconds;
					if( resp.response[i].aid == currentAudioId ){
						activeAudio = 'active';
					}else{
						activeAudio = '';
					}
					$('.track-list').append('<div class="track '+activeAudio+'" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" dur="'+resp.response[i].duration+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><b>'+resp.response[i].artist+'</b> - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
				}
			}else{
				$('.track-list').empty().append('<div class="error"><i class="fa fa-lock"></i><br>'+friend_name+' has private playlist.</div>');
			}
		}
	});
}
function getRecommendations(){
	$('.track-list').fadeOut('fast');
	$('.section-title').text('Recommendations');
	$.ajax({
		url: 'https://api.vk.com/method/audio.getRecommendations',
		type: 'GET',
		data: 'shuffle=1&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.track-list').fadeIn('fast');
			$('.track-list').empty();
			for(i = 1; i < resp.response.length; i++){
				var time = resp.response[i].duration;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				if( seconds < 10 ){ seconds = '0'+seconds }
				var time = minutes+':'+seconds;
				if( resp.response[i].aid == currentAudioId ){
					activeAudio = 'active';
				}else{
					activeAudio = '';
				}
				$('.track-list').append('<div class="track '+activeAudio+'" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" dur="'+resp.response[i].duration+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><b>'+resp.response[i].artist+'</b> - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
			}
		}
	});
}
function getSearch(query){
	$('.track-list').fadeOut('fast');
	$('.section-title').text('Results for "'+$('.search-input').val()+'"');
	$.ajax({
		url: 'https://api.vk.com/method/audio.search',
		type: 'GET',
		data: 'q='+query+'&auto_complate=1&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.track-list').fadeIn('fast');
			$('.track-list').empty();
			for(i = 1; i < resp.response.length; i++){
				var time = resp.response[i].duration;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				if( seconds < 10 ){ seconds = '0'+seconds }
				time = minutes+':'+seconds;
				if( resp.response[i].aid == currentAudioId ){
					activeAudio = 'active';
				}else{
					activeAudio = '';
				}
				$('.track-list').append('<div class="track '+activeAudio+'" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" dur="'+resp.response[i].duration+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><b>'+resp.response[i].artist+'</b> - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
			}
		}
	});
}
function getArtistImage(artist){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'GET',
		data: 'method=artist.getinfo&artist='+encodeURIComponent(artist)+'&autocorrect=1&api_key=997d04eaef5f6419b036fa79e0866a55&format=json',
		dataType: 'jsonp',
		success: function(resp){
			if( typeof(resp.artist) === 'undefined' ){
				$('.artist-cover').fadeOut(400);
			}else{
				$('.artist-cover').fadeOut(400, function(){
					$('.artist-cover').empty().append("<style>.artist-cover{ background-image: url('"+resp.artist.image[3]["#text"]+"'); }</style>");
				});
				$('.artist-cover').fadeIn(400);
			}
		}
	});
}
function playTrack(url){
	$('.play').html('<i class="fa fa-spinner fa-pulse"></i>');
	playerSrc.attr('src', url);
	player[0].pause();
    player[0].load();
    player[0].oncanplaythrough = player[0].play();
    $( "#tracker" ).slider( "value", 0 );
    $( ".current-time" ).html('0:00');
    $( "#tracker" ).slider( "option", "max", 10 );
    $('.play').html('<i class="fa fa-pause"></i>');
    $('.duration-time').html($('.track.active .duration').html());
    $( "#tracker" ).slider( "option", "max", $('.track.active').attr('dur'));
    $('.track-credits').text($('.track.active').attr('artist')+' - '+$('.track.active').attr('track'));
    getArtistImage($('.track.active').attr('artist'));
}
function nextTrack(){
	var next = $('.track.active').next();
        if (next.length == 0) {
            next = $('.track:first-child');
        }
	    $('.track').removeClass('active');
	    $('.track-control').html('<i class="fa fa-play"></i>');
	    next.addClass('active');
	    next.find('.track-control').html('<i class="fa fa-pause"></i>');
	    $('.track-credits').text($('.track.active').attr('artist')+' - '+$('.track.active').attr('track'));
	    playTrack(next.attr('audio'));
}
function prevTrack(){
	var prev = $('.track.active').prev();
        if (prev.length == 0) {
            prev = $('.track:last-child');
        }
	    $('.track').removeClass('active');
	    $('.track-control').html('<i class="fa fa-play"></i>');
	    prev.addClass('active');
	    prev.find('.track-control').html('<i class="fa fa-pause"></i>');
	    $('.track-credits').text($('.track.active').attr('artist')+' - '+$('.track.active').attr('track'));
	    playTrack(prev.attr('audio'));
}
function getFriendsList(){
	$.ajax({
		url: 'https://api.vk.com/method/friends.get',
		type: 'GET',
		data: 'user_id='+vkID+'&order=name&fields=photo_50&name_case=nom',
		dataType: 'jsonp',
		success: function(resp){
			for(i = 1; i < resp.response.length; i++){
				$('.main-menu').append('<li id="'+resp.response[i].uid+'" name="'+resp.response[i].first_name+'"><img src="'+resp.response[i].photo_50+'"><div>'+resp.response[i].first_name+'</div></li>');
			}
		}
	});
}
function getLyrics(id){
	$.ajax({
		url: 'https://api.vk.com/method/audio.getLyrics',
		type: 'GET',
		data: 'lyrics_id='+id+'&access_token='+accessToken,
		dataType: 'jsonp',
		success: function(resp){
			$('.lyrics-window').text(resp.response.text);
		}
	});
}
$(document).ready(function(){
	getMyMusic();
	getFriendsList();
});
$('#populars').click(function(){
	getPopulars();
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$('#recommendations').click(function(){
	getRecommendations();
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$('#my-music').click(function(){
	getMyMusic();
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$(document).on("click", ".main-menu li", function(){
	getFriendsMusic($(this).attr('id'), $(this).attr('name'));
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$(document).on("click",".track" , function(){
	$('.track').removeClass('active');
	$(this).addClass('active');
	$('.track-control').html('<i class="fa fa-play"></i>');
	playTrack($(this).attr('audio'));
	currentAudioId = $(this).attr('aid');
});
$(document).on("click",".track.active" , function(){
	player[0].pause();
});
$('.next-track').click(function(){
	nextTrack();
});
$('.prev-track').click(function(){
	prevTrack();
});
$('.search-input').keyup(function(e){
	if(e.keyCode == 13){
		if($(this).val().length < 3){
			$(this).attr('placeholder', 'At least 3 letters.');
			$(this).val('');
		}else{
			getSearch($('.search-input').val(), 30);
			$('.overlay').fadeOut();
			$('.left-menu').removeClass('open');
		}
		
	} 
});
$('.search-input').blur(function(){
	$(this).attr('placeholder','Search');
})
$('.play').click(function(){
	if( player[0].paused ){
		player[0].play();
		$(this).html('<i class="fa fa-pause"></i>');
	}else{
		player[0].pause();
		$(this).html('<i class="fa fa-play"></i>');
	}
});
	
$('#tracker').slider({
        range: 'min',
        min: 0, max: 10,
        start: function(event,ui) {
        	$('#tracker div').css('-webkit-transition','none');
    		$('.ui-slider-handle').css('-webkit-transition','none');
        },
        slide: function(event, ui) {
            player[0].currentTime = ui.value;
        },
        stop: function(event,ui) {
        	$('#tracker div').css('-webkit-transition','0.1s ease');
    		$('.ui-slider-handle').css('-webkit-transition','0.1s ease');
        }
});

$('.lyrics-overlay').click(function(){
	$(this).fadeOut(300);
});

$(document).on('click', '.fa.fa-file-text-o', function(){
	var lyricsID = $(this).parent().parent().attr('lyrics');
	if( lyricsID == 'undefined' ){
		$('.lyrics-overlay').fadeIn(300);
		$('.lyrics-window').text('No lyrics');
	}else{
		$('.lyrics-overlay').fadeIn(300);
		$('.lyrics-window').text(getLyrics(lyricsID));
	}
});