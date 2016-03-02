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
function setToken(token, id){
	accessToken = token;
	vkID = id;
}
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
				$('.track-list').append('<div class="track" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><div class="track-control"><i class="fa fa-play"></i></div>'+resp.response[i].artist+' - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
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
				$('.track-list').append('<div class="track" aid="'+resp.response[i].aid+'" artist="'+resp.response[i].artist+'" track="'+resp.response[i].title+'" audio="'+resp.response[i].url+'"><div class="track-control"><i class="fa fa-play"></i></div>'+resp.response[i].artist+' - '+resp.response[i].title+'<div class="duration">'+time+'</div></div>');
			}
		}
	});
}
function playTrack(url){
	playerSrc.attr('src', url);
	player[0].pause();
    player[0].load();
    player[0].oncanplaythrough = player[0].play();
}
function nextTrack(){
	var next = $('.track.active').next();
        if (next.length == 0) {
            next = $('.track:first-child');
        }
        playTrack(next.attr('audio'));
	    $('.track').removeClass('active');
	    $('.track-control').html('<i class="fa fa-play"></i>');
	    next.addClass('active');
	    next.find('.track-control').html('<i class="fa fa-pause"></i>');
}
function prevTrack(){
	var prev = $('.track.active').prev();
        if (prev.length == 0) {
            prev = $('.track:last-child');
        }
        playTrack(prev.attr('audio'));
	    $('.track').removeClass('active');
	    $('.track-control').html('<i class="fa fa-play"></i>');
	    prev.addClass('active');
	    prev.find('.track-control').html('<i class="fa fa-pause"></i>');
}
$(document).ready(function(){
	getMyMusic();
});
$('#populars').click(function(){
	getPopulars();
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$('#my-music').click(function(){
	getMyMusic();
	$('.overlay').fadeOut();
	$('.left-menu').removeClass('open');
});
$(document).on("click",".track" , function(){
	$('.track').removeClass('active');
	$(this).addClass('active');
	$('.track-control').html('<i class="fa fa-play"></i>');
	$(this).find('.track-control').html('<i class="fa fa-pause"></i>');
	playTrack($(this).attr('audio'));
});
$(document).on("click",".track.active" , function(){
	player[0].pause();
	$(this).find('.track-control').html('<i class="fa fa-play"></i>');
});
$('.next-track').click(function(){
	nextTrack();
});
$('.prev-track').click(function(){
	prevTrack();
});
