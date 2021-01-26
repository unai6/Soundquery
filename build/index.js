

let video = document.querySelectorAll(".video");
let search = document.querySelector(".search-input");
let videoBlock = document.querySelectorAll(".col");
let searchInput = '';
let timeInput = document.getElementById("timeinput");
let timebutton = document.getElementById("timebutton");
let noMatch = document.querySelector(".nomatch");
let errorPic = document.querySelector(".error-pic");
noMatch.style.display = 'none'
errorPic.style.display = 'none'

class Video {
    constructor(videoToSet, input, button){
        this.videoToSet = videoToSet;
        this.button = button;
        this.input = input;
    }

    setFullScreenOnClick() {
        for (let i = 0; i < this.videoToSet.length; i++) {
            this.videoToSet[i].addEventListener("click", () => {
                if (this.videoToSet[i].requestFullscreen) {
                    this.videoToSet[i].requestFullscreen();
                } else if (this.videoToSet[i].mozRequestFullScreen) { /* Firefox */
                    this.videoToSet[i].mozRequestFullScreen();
                } else if (this.videoToSet[i].webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    this.videoToSet[i].webkitRequestFullscreen();
                } else if (this.videoToSet[i].msRequestFullscreen) { /* IE/Edge */
                    this.videoToSet[i].msRequestFullscreen();
                };
            });
        };
    }

    play() {
        let playing = false;
        for (let i = 0; i < this.videoToSet.length; i++) {
            this.videoToSet[i].addEventListener("click", () => {
                playing = !playing;
                if (playing) {
                    this.videoToSet[i].play();
                } else this.videoToSet[i].pause();
            })
        }
    }

    setPlayingTime() {
        let timeValue;
        timeInput.addEventListener("input", (e) => {
            timeValue = e.target.value;
        })
        for (let i = 0; i < this.videoToSet.length; i++) {
            this.videoToSet[i].addEventListener("timeupdate", function () {
                this.currentTime > (timeValue * 60) && this.videoToSet[i].pause();
            });

        };
    }

    
    hidePlayingTimeHandler() {  
        let showInput = true
        this.button.addEventListener("click", () => {
            showInput = !showInput;
            if (showInput) {
                this.button.textContent = 'OK'
                this.input.style.display = "inline";
            } else {
                this.button.textContent = 'Editar'
                this.input.style.display = "none";
            };
        });
    }
    
    
        showControlsOnHOver() {
            $('.video').hover(function toggleControls() {
                if (this.hasAttribute("controls")) {
                    this.removeAttribute("controls")
                } else {
                    this.setAttribute("controls", "controls")
                }
            })
        }
}

let videoClass = new Video(video, timeInput, timebutton);

videoClass.setFullScreenOnClick();
videoClass.play();
videoClass.setPlayingTime();
videoClass.hidePlayingTimeHandler();
videoClass.showControlsOnHOver();


function showVideos(videos, filteredVideos) {

    videos.forEach((video) => {
        if (filteredVideos.length > 0) {
            filteredVideos.forEach((item) => {
                item.style.display = 'block';
                noMatch.style.display = 'none';
                errorPic.style.display = "none"
            });
            video.style.display = 'none';

        } else {
            noMatch.style.display='block'
            errorPic.style.display = "block"
            video.style.display = 'none';
        }
    })
}


function searchQuery(query, itemsToDisplay) {
    let filtered;
    let newArr = [];

    for (let i = 0; i < itemsToDisplay.length; i++) {
        newArr.push(itemsToDisplay[i])
    };
    query.addEventListener("input", (e) => {
        searchInput = e.target.value;
        filtered = newArr.filter((item) => item.textContent.toLowerCase().includes(searchInput) || item.textContent.includes(searchInput));

        if (!searchInput) { itemsToDisplay.forEach((item) => item.style.display = "block") };

        showVideos(itemsToDisplay, filtered);s
    });
}

searchQuery(search, videoBlock);

