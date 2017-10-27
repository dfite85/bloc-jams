
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
      + '  <td class="song-item-duration">' + songLength + '</td>'
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
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
         if (currentlyPlayingSongNumber !== songNumber) {
             
             setSong(songNumber);
             currentSoundFile.play();
             $(this).html(pauseButtonTemplate);
             currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
             updatePlayerBarSong();
             
         } else if (currentlyPlayingSongNumber === songNumber) {

            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
                
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
           }

    }
 
};     

var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = songNumberCell.attr('data-song-number');


     if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
 };

var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = songNumberCell.attr('data-song-number');


     if (songNumber !== currentlyPlayingSongNumber) {
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
 
     //clear contents of album song list container
     $albumSongList.empty();
 
     // build list of songs form album JavaScript objects
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
    $('.main-controls .play-pause').html(playerBarPauseButton);                                                   //added for assingment
};

var nextSong = function() {
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
        currentSoundFile.play();
    }

var lastSongNumber = currentlyPlayingSongNumber;

    
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber + currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber + lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
        currentSoundFile.play();
    };

    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber + currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber + lastSongNumber);

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
    }
    
    else if (currentSoundFile.isPaused()) {
        currentlyPlayingCell.html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();

    }
    else if (currentSoundFile){
        currentlyPlayingCell.html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
    
    }
    
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
 var $playPauseButton = $('.main-controls .play-pause');                              // added pausePlayButton var to hold .main contols .play-pause



$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playPauseButton.click(togglePlayFromPlayerBar);
});
    
         

  

 
