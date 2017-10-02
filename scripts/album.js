
// Example Album
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
 
 // Another Example Album
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
 
     return template;
 };

     // drp to global scope
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function(album) {
     //Assign values to each part of the album(text, images)
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     //clear contents of album song list container
     albumSongList.innerHTML = '';
 
     // build list of songs form album JavaScript objects
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
   
window.onload = function() {
  setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover', function(event) {
       if (event.target.parentElement.className === 'album-view-song-item') {
           event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
    });
        
    for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     } 
    
         
  var albums = [albumPicasso, albumMarconi, albumQueen]
  var index = 1;
    
  albumImage.addEventListener("click", function(event){
      setCurrentAlbum(albums[index]);
      index++;
      if (index == albums.length) {
          index = 0;
          
      }
  });
};
  