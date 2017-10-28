var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var setSong = function(songNumber) {
    
    if (currentSoundFile) {
    currentSoundFile.stop();
     }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         
    formats: [ 'mp3' ],
    preload: true
    });
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-numbers="' + Number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
      + '</tr>'
      ;
      var $row = $(template);
      $row.find('.song-item-number').click(clickHandler);
      $row.hover(onHover, offHover);
      return $row;

      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    
};

var clickHandler = function() {

    var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            
        }
        
         if (currentlyPlayingSongNumber !== songNumber) {
             $(this).html(pauseButtonTemplate);
             setSong(songNumber);
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             updatePlayerBarSong();
             
         } else if (currentlyPlayingSongNumber === songNumber) {

            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
                updateSeekBarWhileSongPlays();
                
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
           }

    }
 
};     

var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));


     if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
 };

var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));


     if (songNumber !== currentlyPlayingSongNumber) {                     //something is weird here
        songNumberCell.html(songNumber);
     }
 };

var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
     $albumTitle.text(album.title); 
     $albumArtist.text(album.artist); 
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
    
     $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var updatePlayerBarSong = function() {
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.duration));
};

var nextSong = function() {
    
    var getLastSongNumber = function(index){
        return index == 0 ? currentAlbum.songs.length : index;
    }

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length){
        currentSongIndex = 0;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber)
 
    var $volumeFill = $('.volume .fill');
    var $volumeThumb = $('.volume .thumb')
    $volumeFill.width(currentVolume + '%');
    $volumeThumb.css({left: currentVolume + '%'});
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    var getLastSongNumber = function(index){
        return index == (currentAlbum.songs.length -1 ) ? 1 : index + 2;
    }

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex--;

    if (currentSongIndex < 0 ){
        currentSongIndex = currentAlbum.songs.length -1;
    }
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber); 
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    var $volumeFill = $('.volume .fill');
    var $volumeThumb = $('.volume .thumb')
    $volumeFill.width(currentVolume + '%');
    $volumeThumb.css({left: currentVolume + '%'});

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var togglePlayFromPlayerBar = function() {
    
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    
    
    if (currentSoundFile === null){
        setSong(1);
        currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
        currentlyPlayingCell.html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        updatePlayerBarSong();
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
    }
    
    else if (currentSoundFile.isPaused()) {
        currentlyPlayingCell.html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();

    }
    else if (currentSoundFile){
        currentlyPlayingCell.html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
    
    }
    
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    
    var offsetXPercent = seekBarFillRatio * 100;

    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

var setupSeekBars = function() {
    
    var $seekBars = $('.player-bar .seek-bar')
    $seekBars.click(function(event){
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth; 
        
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        }
        
        else 
        {
            setVolume(seekBarFillRatio * 100);
        }
        updateSeekPercentage($(this), seekBarFillRatio);
        
    });
    
    $seekBars.find('.thumb').mousedown(function(event){
        var $seekBar = $(this).parent(); 
        
        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth; 
            
            if ($(this).parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            }
        
            else 
            {
                setVolume(seekBarFillRatio * 100);
            }
        
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        
        $(document).bind('mouseup.thumb', function(event){
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });  
    });
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event){
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            
            updateSeekPercentage($seekBar, seekBarFillRatio);  
            setCurrentTimeInPlayerBar(filterTimeCode(this.getTime()));
        });
    }
}

var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }
 
var setCurrentTimeInPlayerBar = function(currentTime){
    $('.seek-control .current-time').text(currentTime); 
}
 
var setTotalTimeInPlayerBar = function(totalTime){
    $('.seek-control .total-time').text(totalTime);
}

var filterTimeCode = function(timeInSeconds){
    
    var totalTime = parseFloat(timeInSeconds);
    var minutes = Math.floor(totalTime/60);
    var seconds = Math.floor(totalTime % 60); 
    var final = minutes + ":"
    if (seconds < 10) 
        {final += "0";}
    final +=seconds; 
    return final; 
};


// GLOBAL VARIABLES
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 var $albumTitle = $('.album-view-title');
 var $albumArtist = $('.album-view-artist');
 var $albumReleaseInfo = $('.album-view-release-info');
 var $albumImage = $('.album-cover-art');
 var $albumSongList = $('.album-view-song-list');
 var $playPauseButton = $('.main-controls .play-pause');



$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playPauseButton.click(togglePlayFromPlayerBar);
});
    


  

 
