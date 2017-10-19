 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
     // Dont judge me!!!!!
var albumQueen = {
     title: 'Queen Rock Montreal',
     artist: 'Queen',
     label: 'Mountain Studios',
     year: '1982',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Intro', duration: '1:59' },
         { title: 'We Will ROck You', duration: '3:06' },
         { title: 'Play The Game', duration: '3:57'},
         { title: 'Somebody To Love', duration: '7:53' },
         { title: 'Killer Queen', duration: '1:59'},
         { title: "I'm in Love with My Car", duration: '2:03' },
         { title: 'Get Down, Make Love', duration: '4:45' },
         { title: 'Save Me', duration: '4:14'},
         { title: 'Dragon Attack(song)', duration: '3:11' },
         { title: "Now I'm here", duration: '1:59'},
         { title: 'Love Of My Life', duration: '3:56' },
         { title: 'Under Pressure', duration: '3:49' }
     ]
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
     
      var clickHandler = function() {
          
          var songNumber = $(this).attr('.data-song-number');
          
          if (currentlyPlayingSong !== null) {
              var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
              currentlyPlayingCell.html(currentlyPlayingSong);
          }
          if (currentlyPlayingSong !== songNumber) {
              $(this).html(pauseButtonTemplate);
              currentlyPlayingSong - songNumber;
          } else if (currentlyPlayingSong === songNumber) {
              $(this).htl(playButtonTemplate);
              currentlyPlayingSong = null;
          }
      };
     
      var onHover = function(event) {
          var songNumberCell = $(this).find('.song-item-number');
          var songNumber = songNumberCell.attr('data-song-number');
          
          if (songNumber !== currentlyPlayingSong) {
              songNumberCell.html(playButtonTemplate);
          }
          
      };
     
      var offHover = function(event) {
          var songNumberCell = $(this).find('.song-item-number');
          var songNumber = songNumberCell.attr('data-song-number');
          
          if (songNumber !== currentlyPlayingSong) {
              songNumberCell.html(songNumber);
          
          }
          
      };
     
      $row.find('.song-item-number').click(clickHandler);
      $row.hover(onHover, offHover);
      return $row;
     
 };

     // drp to global scope
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];



 var setCurrentAlbum = function(album) {
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

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//store state of playing songs
var currentlyPlayingSong = null
   
$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});
    
         
  var albums = [albumPicasso, albumMarconi, albumQueen]
  var index = 1;
    
  albumImage.addEventListener("click", function(event){
      setCurrentAlbum(albums[index]);
      index++;
      if (index == albums.length) {
          index = 0;
          
      }
  });

  


