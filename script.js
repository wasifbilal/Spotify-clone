console.log("Welcome to our app spotify clone");
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songDuration = document.getElementById("songStamp");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let masterSongName = document.getElementById('masterSongName');
// audioElement.play();
let songs = [
    {songName : "Dil awara", songPath : "songs/1.mp3", songCover : "covers/1.webp"},
    {songName : "Dont stop", songPath : "songs/2.mp3", songCover : "covers/2.jpg"},
    {songName : "Goku-song", songPath : "songs/3.mp3", songCover : "covers/3.webp"},
    {songName : "odnogo", songPath : "songs/4.mp3", songCover : "covers/4.webp"},
    {songName : "tu dhadkan", songPath : "songs/5.mp3", songCover : "covers/5.webp"},
    {songName : "Dont'stop", songPath : "songs/6.mp3", songCover : "covers/6.webp"}
]
songItem.forEach((element, i) => {
    // console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].songCover;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
});

//handle play/pause
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <=0){
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        audioElement.play();
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log("time updating....");
    //update seekbBar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    // console.log(progress);
    progressBar.value = progress;
})

progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    }) 
}     
        

Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        masterSongName.innerText =songs[songIndex - 1].songName;
        audioElement.src= `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
})
next.addEventListener('click' , () => {
    if(songIndex >= 6) {
        songIndex = 1;
    }else{
        songIndex+=1;
    }
    audioElement.src= `songs/${songIndex}.mp3`;
    masterSongName.innerText =songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

previous.addEventListener('click' , () => {
    if(songIndex <= 1) {
        songIndex = 6;
    }else{
        songIndex-=1;
    }
    audioElement.src= `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

