let video = document.querySelectorAll(".video");
let titleVideo = document.querySelectorAll(".title-video");
let videoWrapper = document.querySelector(".section-videos");
let search = document.querySelector(".search-input");
let videoBlock = document.querySelectorAll(".col");
let searchInput = '';


$("#container").removeAttr("unselectable");

console.log(document.querySelector(".bottomBar"))
class Video {

    setFullScreenOnClick() {
        for (let i = 0; i < video.length; i++) {
            video[i].addEventListener("click", () => {
                if (video[i].requestFullscreen) {
                    video[i].requestFullscreen();
                } else if (video[i].mozRequestFullScreen) { /* Firefox */
                    video[i].mozRequestFullScreen();
                } else if (video[i].webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    video[i].webkitRequestFullscreen();
                } else if (video[i].msRequestFullscreen) { /* IE/Edge */
                    video[i].msRequestFullscreen();
                }
            });
        };
    }

}

let videoClass = new Video;

videoClass.setFullScreenOnClick();


function showVideos(videos, filteredVideos) {
    let section = document.querySelector(".section-videos");
    let noQuery = document.createElement("h1");
    noQuery.innerHTML = " No hay videos que coincidan con esa descripción"
    
    videos.forEach((video) => {
        video.style.display = "block"
        if (filteredVideos.length > 0) {
            filteredVideos.forEach((item) => item.style.display = 'block');
            video.style.display = 'none';
       
        } else {
        
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

