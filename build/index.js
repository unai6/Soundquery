let video = document.querySelectorAll(".video");
let titleVideo = document.querySelectorAll(".title-video");
let videoWrapper = document.querySelector(".section-videos");
let search = document.querySelector(".search-input")
let searchInput = ''

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


function searchQuery(query, collection) {
    let filtered;
    let newArr = [];

    for (let i = 0; i < collection.length; i++) {
        newArr.push(collection[i].textContent)
    };
    query.addEventListener("input", (e) => {
        searchInput = e.target.value;
        filtered = newArr.filter((item) => item.toLowerCase().includes(searchInput) || item.includes(searchInput));

        for (let i = 0; i < collection.length; i++) {
            if (collection[i].textContent.includes(filtered)) {  
                document.querySelectorAll(".col")[i].style.display = "block";
            } else {
                document.querySelectorAll(".col")[i].style.display = "none"
            }
            if (!searchInput)document.querySelectorAll(".col")[i].style.display = "block";
        }
    });

    return filtered;
}

searchQuery(search, titleVideo);

