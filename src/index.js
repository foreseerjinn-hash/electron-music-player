const audio = new Audio();
let audArr1 = [];
let button = "paused";
let currentSong = "";
const progressEl = document
                   .querySelector('input[type="range"]');
let mouseDownOnSlider = false;

audio
.preload = MediaMetadata;

function handleFiles(event) 
{
 let files = event
             .target
             .files;
 let found = false;
 audArr1 = Object
           .values(files)
           .map((f) => 
                {
                 return URL
                        .createObjectURL(f);
                });
 audio
 .src = audArr1;
 audio
 .load;
 console.log(audArr1);
}

let file = document
           .getElementById("upload")
           .addEventListener("change",
                             handleFiles, 
                             fetchFile,
                             false);

let reader = new FileReader();

reader
.onload = function (e)
          {
           let result = e
                        .target
                        .result;
           return result;
          };

function fetchFile()
{
 fetch(file)
 .then(resp => resp
               .blob())
 .then(blob => reader
               .readAsArrayBuffer(blob));
};

function currSong(nextOrPreviousSong)
{
 const songToPlay = nextOrPreviousSong ? nextOrPreviousSong : 
 currentSong ? currentSong : audArr1[0];
 currentSong = songToPlay;
 audio.play();
 button = "playing"
}

const nextSong = () => 
{
 const currentIndex = audArr1
                      .indexOf(currentSong);
 const nextIndex = currentIndex + 1;
 const nextSong = audArr1[nextIndex];
 currSong(nextSong);
 audio
 .src = nextSong;
 audio
 .play();
 button = "playing";
};

const previousSong = () => 
{
 const currentIndex = audArr1
                      .indexOf(currentSong);
 const prevIndex = currentIndex - 1;
 const prevSong = audArr1[prevIndex];
 audio
 .src = prevSong;
 audio
 .play();
 button = "playing";
};

document
.getElementById("playPause")
.addEventListener("click", 
                  () => 
                  {                   
                   if (button != "playing") 
                   {
                    currSong()
                    console.log("playing");
                   } 
                   else 
                   {
                    audio
                    .pause();
                    button = "paused"; 
                    console.log("paused"); 
                   }
                   audio
                   .crossOrigin = 'anonymous';
                  });

document
.getElementById("nxtBtn")
.addEventListener("click", 
                  () => 
                  {nextSong();});

document
.getElementById("prevBtn")
.addEventListener("click", 
                  () => 
                  {previousSong();});

let volume = document.
             getElementById("vol");
volume
.addEventListener("change", 
                  function(e) 
                  {
                   audio
                   .volume = e
                   .currentTarget
                   .value / 100;
                  }) 

audio
.addEventListener("loadeddata", 
                  () => 
                  {
                   progressEl
                   .value = 0;
                  });

audio
.addEventListener("timeupdate", 
                  () => 
                  {
                   if (!mouseDownOnSlider) 
                   {
                    progressEl
                    .value = audio
                             .currentTime / audio
                                            .duration * 100;
                   }
                  });

progressEl
.addEventListener("change", 
                  () => 
                  {
                   const pct = progressEl
                               .value / 100;
                   audio
                   .currentTime = (audio
                                   .duration || 0) * pct;
                  });

progressEl
.addEventListener("mousedown", 
                  () => 
                  {
                   mouseDownOnSlider = true;
                  });

progressEl
.addEventListener("mouseup", 
                  () => 
                  {
                   mouseDownOnSlider = false;
                  });