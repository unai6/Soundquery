

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

    setFullScreenOnClick(videoToSet) {
        for (let i = 0; i < videoToSet.length; i++) {
            videoToSet[i].addEventListener("click", () => {
                if (videoToSet[i].requestFullscreen) {
                    videoToSet[i].requestFullscreen();
                } else if (videoToSet[i].mozRequestFullScreen) { /* Firefox */
                    videoToSet[i].mozRequestFullScreen();
                } else if (videoToSet[i].webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    videoToSet[i].webkitRequestFullscreen();
                } else if (videoToSet[i].msRequestFullscreen) { /* IE/Edge */
                    videoToSet[i].msRequestFullscreen();
                };
            });
        };
    }

    play(videoToSet) {
        let playing = false;
        for (let i = 0; i < videoToSet.length; i++) {
            videoToSet[i].addEventListener("click", () => {
                playing = !playing;
                if (playing) {
                    videoToSet[i].play();
                } else videoToSet[i].pause();
            })
        }
    }

    setPlayingTime(videoToSet) {
        let timeValue;
        timeInput.addEventListener("input", (e) => {
            timeValue = e.target.value;
        })
        for (let i = 0; i < videoToSet.length; i++) {
            videoToSet[i].addEventListener("timeupdate", function () {
                this.currentTime > (timeValue * 60) &&
                    videoToSet[i].pause();
            });

        };
    }

    hidePlayingTimeHandler(input, button) {
        let showInput = true
        button.addEventListener("click", () => {
            showInput = !showInput;
            if (showInput) {
                button.textContent = 'OK'
                input.style.display = "inline";
            } else {
                button.textContent = 'Editar'
                input.style.display = "none";
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

let videoClass = new Video;

videoClass.setFullScreenOnClick(video);
videoClass.play(video);
videoClass.setPlayingTime(video);
videoClass.hidePlayingTimeHandler(timeInput, timebutton);
videoClass.showControlsOnHOver();


function showVideos(videos, filteredVideos) {

    videos.forEach((video) => {
        video.style.display = "block"
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

        if (!searchInput) {
            itemsToDisplay.forEach((item) => item.style.display = "block");
        };

        showVideos(itemsToDisplay, filtered);

    });
}

searchQuery(search, videoBlock);

