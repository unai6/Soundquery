let video = document.querySelectorAll(".video");
let titleVideo = document.querySelectorAll(".title-video");
let videoWrapper = document.querySelector(".section-videos");
let search = document.querySelector(".search-input");
let videoBlock = document.querySelectorAll(".col");
let searchInput = '';

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

    videos.forEach((video) => {
        video.style.display = "block"
        if (filteredVideos) {
            filteredVideos.forEach((item) => item.style.display ='block')
            video.style.display = 'none'
        } else {
           let h1 =  document.createElement("h1");
           console.log("nothing here")
           h1.innerHTML =" No hay videos que coincidan con esa descripción"
           let section = document.querySelector(".section-videos");
           section.appendChild(h1)
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
        showVideos(itemsToDisplay, filtered)
        if (!searchInput) {
            itemsToDisplay.forEach((item) => item.style.display = "block");
        }
    });
}

searchQuery(search, videoBlock);

