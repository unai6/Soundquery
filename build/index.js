

let video = document.querySelectorAll(".video");
let search = document.querySelector(".search-input");
let videoBlock = document.querySelectorAll(".col");
let searchInput = '';
let timeInput = document.getElementById("timeinput");
let timeButton = document.getElementById("timebutton");
let noMatch = document.querySelector(".nomatch");
let errorPic = document.querySelector(".error-pic");
noMatch.style.display = 'none'
errorPic.style.display = 'none'

class Video {
    constructor(video, timeInput, timeButton){
        this.video = video;
        this.timeButton = timeButton;
        this.timeInput = timeInput;

        this._setFullScreenOnClick();
        this._play();
        this._setPlayingTime();
        this._hidePlayingTimeHandler();
        this._showControlsOnHOver();
    }

    _setFullScreenOnClick() {
        for (let i = 0; i < this.video.length; i++) {
            this.video[i].addEventListener("click", () => {
                if (this.video[i].requestFullscreen) {
                    this.video[i].requestFullscreen();
                } else if (this.video[i].mozRequestFullScreen) { /* Firefox */
                    this.video[i].mozRequestFullScreen();
                } else if (this.video[i].webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    this.video[i].webkitRequestFullscreen();
                } else if (this.video[i].msRequestFullscreen) { /* IE/Edge */
                    this.video[i].msRequestFullscreen();
                };
            });
        };
    }

    _play() {
        let playing = false;
        for (let i = 0; i < this.video.length; i++) {
            this.video[i].addEventListener("click", () => {
                playing = !playing;
                if (playing) {
                    this.video[i].play();
                } else this.video[i].pause();
            })
        }
    }
    _setPlayingTime() {
        let timeValue;
        timeInput.addEventListener("input", (e) => {
            timeValue = e.target.value;
        })
        for (let i = 0; i < this.video.length; i++) {
            this.video[i].addEventListener("timeupdate", function () {
                this.currentTime > (timeValue * 60) && video[i].pause();
            });

        };
    }

    
    _hidePlayingTimeHandler() {  
        let showInput = true
        this.timeButton.addEventListener("click", () => {
            showInput = !showInput;
            if (showInput) {
                this.timeButton.textContent = 'OK'
                this.timeInput.style.display = "inline";
            } else {
                this.timeButton.textContent = 'Editar'
                this.timeInput.style.display = "none";
            };
        });
    }
    
    
    _showControlsOnHOver() {
         $('.video').hover(function toggleControls() {
             if (this.hasAttribute("controls")) {
                this.removeAttribute("controls")
                } else {
                    this.setAttribute("controls", "controls")
                }
            })
        }
}

let videoClass = new Video(video, timeInput, timeButton);




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

        showVideos(itemsToDisplay, filtered);
    });
}

searchQuery(search, videoBlock);

