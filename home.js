console.log("Welcome to Spotify");

//variable initialization
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSong = document.getElementById('masterSong');


let songs = [
    {songname:"Let me Love you", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songname:"Kuch Baatein", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songname:"Rula Deti Hai", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songname:"O Dilbar Yaara", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songname:"Tera Hua-Cash", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songname:"O Aasman wale", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songname:"Dil Pe Jakhm", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songname:"Tumse Pyar karke", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songname:"Barsat Ki Dhun", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"}
]

// update the song name and the time using java script
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;  //update the cover in img tag 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;  //update the song name in the span tag 


})

// pause/play control of the song
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    

    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

    }

})

// progress bar continuation
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    progress = parseInt(audioElement.currentTime/audioElement.duration * 100);  //give progress value in the percentage
    console.log(progress);

    progressBar.value = progress;  // Seek the progress bar 
  
})


//Update the song duration according to seek bar
progressBar.addEventListener('change',()=>{
    //use progress bar value here instead of progress
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100;
})


// A function for the rechange the state of play/pause button on when click on other
const makeAllplay = ()=>{
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}


//play songs from the container
Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllplay();

        songindex = parseInt(e.target.id); //index for the song get from he id 

        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        //change the source of the song according to index value
        audioElement.src = `songs/${songindex+1}.mp3`;
        masterSong.innerText = songs[songindex].songname;

        //restart the seek bar from starting 
        audioElement.currentTime = 0;

        //play the targetted song
        audioElement.play();

        //change the state of buttons in the bottom bar with the playong gif
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

    })
})

//control of next song button ad the previous song button
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex < 1)
    {
        songindex = 0;
    }
    else
    {
        songindex = songindex-1;
    }

    audioElement.src = `songs/${songindex+1}.mp3`;

    masterSong.innerText = songs[songindex].songname;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');    
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex >= 8)
    {
        songindex = 8;
    }
    else
    {
        songindex = songindex+1;
    }

    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSong.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');    
})



