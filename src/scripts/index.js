import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
    require('../index.html');
}
$(document).ready(function () {
    $('.slider').slick({
        slidesToShow: 3,
        speed: 1500,
        easing: 'ease',
        infinite: false,
        responsive: [{
            breakpoint: 1060, // - от какой ширины изменять настройки(1024 и ниже)
            settings: {
                // вносим изменения на ширине 1024 и ниже 
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 510, // брекпоинтов может быть сколько угодно
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });
});



const headerContent = document.querySelector('._header_content');
const buttonBurger = document.querySelector('._burger');
const buttonShare = document.querySelector('._share');
const shareContent = document.querySelector('.socials');

buttonBurger.addEventListener('click', () => {

    if (headerContent.classList.contains('active')) {
        headerContent.classList.remove('active')

    } else {
        headerContent.classList.add('active');
    }
});
buttonShare.addEventListener('click', () => {

    if (shareContent.classList.contains('active')) {
        shareContent.classList.remove('active')

    } else {
        shareContent.classList.add('active');
    }


});

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

let videoPlayId = 1;

function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }

    function initRating(rating) {
        initRatingVars(rating);
        setRatingActiveWidth();
        if (rating.classList.contains("rating_set")) {
            setRating(rating);
        }
    }

    function initRatingVars(rating) {

        ratingActive = rating.querySelector(".rating__active");
        ratingValue = rating.querySelector(".rating__value");
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {

        const ratingActiveWidth = index / 0.05;

        ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    function setRating(rating) {
        const ratingItems = rating.querySelectorAll(".rating__item");
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function () {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function () {

                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                initRatingVars(rating);
                ratingValue.innerHTML = index + 1;
                var ocenka = index + 1
                let rating_total = "rating" + " " + ocenka;
                let nameVideo = listLi[videoPlayId - 1].innerText;


                setRatingActiveWidth();

            });
        }
    }
}

const videoPlashka = document.querySelectorAll('.video_plashka');
const videoPlayImgs = document.querySelectorAll('.video_plashka'); //здесь был play_img
const wrapperVideo = document.querySelectorAll('video');
const mainVideoBtn = document.querySelectorAll('.main_video_btn');


for (let btn of mainVideoBtn) {

    btn.addEventListener('click', () => {
        let id = btn.dataset.video;
        video_Active(id);
        let videoPlayId = id;
        updateAcive(videoPlayId);

        Play(id);
    });
};


for (let videoPlayImg of videoPlayImgs) {
    videoPlayImg.addEventListener('click', () => {
        let idVideo = videoPlayImg.dataset.video;
        initSlide();
        Play(idVideo);

    });
}



let Play = (id) => {
    for (let plashka of videoPlashka) {
        if (plashka.dataset.video == id) {

            plashka.classList.add('active')
        }
    }
    for (let video of wrapperVideo) {
        if (video.dataset.video == id) {
           
            video.play();

            videoPlayId = id;

        }
    }
    initSlide();

}

let AutoPlay = (id) => {
    for (let plashka of videoPlashka) {
        if (plashka.dataset.video == id) {

            plashka.classList.add('active')
        }
    }
    for (let video of wrapperVideo) {
        if (video.dataset.video == id) {
            video.muted = true;
            video.play();
            videoPlayId = id;

        }
    }

}

let Stop = (id) => {
    for (let video of wrapperVideo) {
        if (video.dataset.video == id) {

            video.pause();
        }
        for (let plashka of videoPlashka) {
            if (plashka.dataset.video == id) {

                plashka.classList.remove('active')
            }
        }
    }
}
let hash = '';
let hashVideo;
let hashVideoId;
let hashId;
if (window.location.hash) {
    hash = window.location.hash;
    hashVideo = document.querySelector(hash);
    if (!hash) {
        hashVideoId = 1;
        hashId = 1;

    }
    else {

        hashVideoId = hashVideo.dataset.video;
    }


    setTimeout(() => {
        AutoPlay(hashVideoId);
    }, 1000);
    console.log('123');
}

let StopAll = () => {
    for (let video of wrapperVideo) {
        video.pause();

    }
}

for (let video of wrapperVideo) {
    video.addEventListener('pause', () => {
        let id = video.dataset.video
        Stop(id);
    });

}
let time_code = document.querySelectorAll('.time_code');
for (let btn of time_code) {
    btn.addEventListener('click', () => {
        let time = btn.dataset.play;
        for (let video of wrapperVideo) {
            let id = video.dataset.video
            if (id == videoPlayId) {
                video.currentTime = time;
                Play(videoPlayId);

            }
        }


        remove_Active(time_code);
        btn.classList.add('active');
    });
};

window.onscroll = function () {
    myFunction()
};
var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");

    } else {
        header.classList.remove("sticky");
    }
};
let share_btns = document.querySelectorAll('.ya-share2');

let btns = document.querySelectorAll('.scheme_btn');
let _preparat_content = document.querySelectorAll('._preparat_content');

for (let btn of btns) {
    btn.addEventListener('click', () => {
        let idBtns = btn.dataset.id;
        remove_Active(btns);
        btn.classList.add('active');
        preparat_Active(idBtns);

    });
}

var remove_Active = (el) => {
    for (let btn of el) {
        btn.classList.remove('active');
    }
};
var preparat_Active = (id) => {
    for (let preparat of _preparat_content) {

        var dataId = preparat.dataset.id;
        preparat.classList.remove('active');
        if (id == dataId) {
            preparat.classList.add('active');
        }
    }
};
var share_Active = (id) => {
    for (let btn of share_btns) {
        var dataId = btn.dataset.video;
        btn.classList.remove('active');

        if (id == dataId) {

            btn.classList.add('active');
        }
    }

};

var btns_Active = (id) => {

    for (let btn of btns) {
        var dataId = btn.dataset.id;
        btn.classList.remove('active');
        if (id == dataId) {
            btn.classList.add('active');
        }
    }

};


let yel_btns = document.querySelectorAll('._yellow');
let _instruct_content = document.querySelectorAll('._grey_blocks');


for (let yel_btn of yel_btns) {

    yel_btn.addEventListener('click', () => {
        if (yel_btn.classList.contains('active')) {
            yel_btn.classList.remove("active");
            let idBtns = yel_btn.dataset.id;
            instruct_Active(idBtns);
        } else {
            let idBtns = yel_btn.dataset.id;
            remove_Active(yel_btns);
            yel_btn.classList.add('active');
            instruct_Active(idBtns);


        }


    });
};

var instruct_Active = (id) => {

    for (let instruct of _instruct_content) {
        if (instruct.classList.contains('active')) {
            instruct.classList.remove("active");

        } else {
            var dataId = instruct.dataset.id;
            instruct.classList.remove('active');
            if (id == dataId) {
                instruct.classList.add('active');
            }
        }

    }

};
var grey_films = document.querySelectorAll('.grey_films')
let listLi = document.querySelectorAll('.list_li');
let lists = document.querySelectorAll('.ul_list');
let videos = document.querySelectorAll('.video');
let btns_list = document.querySelectorAll('.btn_list');

for (let btn_list of btns_list) {
    btn_list.addEventListener('click', () => {
        let idBtn = btn_list.dataset.id;
        liter_list_Active(idBtn);

        let videoId = btn_list.dataset.video;
        list_Active(idBtn, videoId);
        updateAcive(videoId);
        initRange(activeSlide, activeRange);
        Play(videoId);

    });
};

var btns_list_Active = (id) => {

    for (let btn of btns_list) {
        var dataId = btn.dataset.id;
        btn.classList.remove('active');
        if (id == dataId) {
            btn.classList.add('active');
            let videoId = btn.dataset.video;
            list_Active(id, videoId);

        }
    }

};
let activeSlide;
let activeRange;
let initSlide = () => {
    console.log("init");
    for (let id_slider = 0; id_slider < grey_films.length; id_slider++) {
        const active_slide = grey_films[id_slider];
        if (active_slide.classList.contains('active')) {
            let sld = active_slide.querySelector('.slider_grey')
            let range = active_slide.querySelector('.range')
            if (sld.classList.contains('slick-slider')) {
                return;
            } else {
                console.log(sld);
                activeSlide = sld;
                activeRange = range;
                $(sld).slick({
                    slidesToShow: 4,
                    arrows: false,
                    dots: false,
                    responsive: [{
                        breakpoint: 940, // - от какой ширины изменять настройки(1024 и ниже)
                        settings: {
                            // вносим изменения на ширине 1024 и ниже 
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 510, // брекпоинтов может быть сколько угодно
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                    ]
                });
            }
        }

    }

}

let initRange = (slider, range) => {

    $(slider).on('init reInit', function (event, slick, slideCount) {

        let amount = slick.slideCount;
        $(range).attr('max', amount);
        console.log('1');
    })

    $(slider).on('afterChange', function (e, slick, currentSlide) {
        let amount = slick.slideCount;
        $(range).attr('max', amount);
        $(range).val(currentSlide + 1);

    })

    $(range).on('input change', function () {
        $(slider).slick('slickGoTo', this.value - 1);

        console.log('3');
    });
}


var list_Active = (id, videoId) => {
    for (let list of lists) {
        var dataId = list.dataset.id;
        list.classList.remove('active');
        if (id == dataId) {
            list.classList.add('active');
        }
    }
    for (let list of grey_films) {

        var dataId = list.dataset.id;
        list.classList.remove('active');
        if (id == dataId) {
            list.classList.add('active');
        }
    }
    for (let video of videos) {
        var dataId = video.dataset.video;
        video.classList.remove('active');
        if (videoId == dataId) {
            video.classList.add('active');
        }
    }

};


let film_list = document.querySelectorAll('.film');
let items_video = document.querySelectorAll('.video');

for (let li of listLi) {
    li.addEventListener('click', () => {
        remove_Active(listLi);
        li.classList.add('active');
        let videoId = li.dataset.video;
        video_Active(videoId);
        Play(videoId);


    });
};

for (let film of film_list) {
    film.addEventListener('click', () => {
        remove_Active(film_list);

        film.classList.add('active');
        let videoId = film.dataset.video;
        initSlide();
        video_Active(videoId);

    });
};



var video_Active = (id) => {

    for (let item_video of items_video) {
        var dataId = item_video.dataset.video;
        item_video.classList.remove('active');
        if (id == dataId) {
            if (item_video.id) {
                share_Active(id);

            }
            item_video.classList.add('active');
        }
    }
    updateAcive(id);

};

let liter_lists = document.querySelectorAll('.litera_list')

var liter_list_Active = (id) => {
    for (let liter_list of liter_lists) {
        var dataId = liter_list.dataset.id;
        liter_list.classList.remove('active');
        if (id == dataId) {
            liter_list.classList.add('active');
        }
    }
};



let updateAcive = (id) => {
    StopAll();
    share_Active(id);
    remove_Active(btns_list);
    remove_Active(lists);
    remove_Active(listLi);
    remove_Active(grey_films);
    remove_Active(film_list);
    videoPlayId = id;

    for (let list of lists) {
        var dataId = list.dataset.video;
        list.classList.remove('active');
        if (id == dataId) {
            list.classList.add('active');

        }
    }

    for (let film of film_list) {
        var dataId = film.dataset.video;
        film.classList.remove('active');

        if (id == dataId) {

            film.classList.add('active');
        }
    }

    if (id) {
        listLi[id - 1].classList.add('active');
    }

    if (id < 5) {
        grey_films[0].classList.add('active');
        lists[0].classList.add('active');
        btns_list[0].classList.add('active');
        preparat_Active(1);
        btns_Active(1);
        liter_list_Active(1);



    }
    if (id > 4 && id < 12) {
        grey_films[1].classList.add('active');
        lists[1].classList.add('active');
        btns_list[1].classList.add('active');
        preparat_Active(2);
        btns_Active(2);
        liter_list_Active(2);

    }
    if (id > 11 && id < 15) {
        grey_films[2].classList.add('active');
        lists[2].classList.add('active');
        btns_list[2].classList.add('active');
        preparat_Active(3);
        btns_Active(3);
        liter_list_Active(3);


    }
    if (id > 14) {
        btns_Active(4);
        preparat_Active(4);
        liter_list_Active(4);
        grey_films[3].classList.add('active');
        lists[3].classList.add('active');
        btns_list[3].classList.add('active');
    }

    initRange(activeSlide, activeRange);
    initSlide();
    console.log("update");
}

$(document).ready(function () {

    if (hashVideoId) {
        updateAcive(hashVideoId);
        video_Active(hashVideoId);
    }
    if (hashId) {
        preparat_Active(hashId);
        btns_Active(hashId);

    }
    if (!hashVideoId) {
        initSlide();
        updateAcive(1);
    }

    console.log(hashVideoId);




});

console.log('webpack starterkit');