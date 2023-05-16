

document.getElementById("career_job").addEventListener("mouseover", mouseOverJob);

function mouseOverJob() {
    document.getElementById("career_job").classList.add('active')
    document.getElementById("career_talent").classList.remove('active')
}

document.getElementById("career_talent").addEventListener("mouseover", mouseOverTalent);

function mouseOverTalent() {
    document.getElementById("career_talent").classList.add('active')
    document.getElementById("career_job").classList.remove('active')
}


/**
 * 스와이프 이벤트
 **/
var swiper = new Swiper(".slide_tab", {
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".slide_con", {
    spaceBetween: 30,
    pagination: {
        el: ".slide_circle",
        clickable: true,
    },
    thumbs: {
        swiper: swiper,
    },
});
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
history.scrollRestoration = "manual";

/**
 * 숫자 카운팅 이벤트
 **/
const count01 = document.getElementById("count01");
const count02 = document.getElementById("count02");
const count03 = document.getElementById("count03");

function numberCounting(obj, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    let current = start;
    const timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function numberIncreaseEvent() {
    numberCounting(count01, 0, 463, 1000);
    numberCounting(count02, 0, 30, 1200);
    numberCounting(count03, 0, 6, 1300);
}

/**
 * 스크롤 이벤트
 **/
const sections = [null, ...document.querySelectorAll('.section, .footer_section')];
const container = document.getElementById('container');
const TOP_SECTION_INDEX = 1;
const BOTTOM_SECTION_INDEX = document.querySelectorAll('.section, .footer_section').length;
const MOVE_V_HEIGHT = 100;    //스크롤당 움직일 VHeight
const FOOTER_V_HEIGHT = 38;

let currSectionIndex = TOP_SECTION_INDEX;
let nextSectionIndex = TOP_SECTION_INDEX;
let isScrolling = false;

function scroll(obj) {
    //스크롤 중이거나, top, bottom 을 찍었다면 스크롤 불가능하게 방지
    if (isScrolling || nextSectionIndex < TOP_SECTION_INDEX || nextSectionIndex > BOTTOM_SECTION_INDEX) {
        nextSectionIndex = currSectionIndex;
        return;
    }

    let section;
    let sectionLen;
    let currHeight;

    //scroll 이벤트 대상이 container가 아닐 경우 방지 (간혹 window가 대상일 경우 존재)
    if (this !== undefined && this.id === 'container') {
        section = this;
    } else if (obj !== undefined && obj.id === 'container') {
        section = obj;
    } else {
        return;
    }

    nextVHeight = nextSectionIndex != BOTTOM_SECTION_INDEX ? ((nextSectionIndex - 1 ) * -1 * MOVE_V_HEIGHT)
        : (nextSectionIndex - 2 ) * -1 * MOVE_V_HEIGHT - FOOTER_V_HEIGHT;    //다음 움직일 Height 계산

    //스크롤중이 아닐 경우만 스크롤 이벤트 동작
    if (isScrolling === false) {
        isScrolling = true;

        const NEXT_SECTION_CLASS_NAME = `section${nextSectionIndex}`;
        const CURR_SECTION_CLASS_NAME = `section${currSectionIndex}`;

        container.parentElement.classList.remove(CURR_SECTION_CLASS_NAME)
        container.parentElement.classList.add(NEXT_SECTION_CLASS_NAME);
        currSectionIndex = nextSectionIndex;

        if (currSectionIndex === 4) {
            numberIncreaseEvent();
        }

        setTimeout(function() {
            isScrolling = false;
        }, 700);
    }
}

/* 위로 올리기 */
document.querySelector('.btn_top').addEventListener('click', () => {
    const bodyElement = document.querySelector('body');
    bodyElement.className = 'section1';
    const container = document.querySelector('#container');
    container.style = '';
    currSectionIndex = 1;
    nextSectionIndex = 1;
})

//모바일에서 스와이프 동작으로 스크롤이벤트 똑같이 동작하도록 이벤트 추가
function swipe(obj) {
    let swipeDirection,currY,moveY;
    let swipeElpasedTime;
    let startTime;
    const swipeLength = 100;
    const swipeAllowedTime = 500;

    //스와이프 이벤트가 스크롤링이벤트인지 파악하기 위해 현재 Y위치 파악
    obj.addEventListener('touchstart', function(e) {
        const tchs = e.changedTouches[0];
        swipeDirection = 'none';
        currY = tchs.pageY;
        startTime = new Date().getTime();
    }, false);

    obj.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    //스와이프가 끝났을때 스크롤링 이벤트인지 파악후 스크롤링 이벤트 적용
    obj.addEventListener('touchend', function(e) {
        const tchs = e.changedTouches[0];
        moveY = tchs.pageY - currY;
        swipeElpasedTime = new Date().getTime() - startTime;

        //스와이프 동작 이벤트가 수행되었는지 시간으로 1차 필터링
        if (swipeElpasedTime <= swipeAllowedTime) {
            //이동 높이로 스크롤링이벤트인지 2차 필터링
            if (Math.abs(moveY) >= swipeLength) {
                swipeDirection = moveY !== 0 ? ((moveY < 0) ? 'up' : 'down') : 'none';
            }
            //스크롤링 이벤트 동작
            if (obj.id === 'container') {
                if (swipeDirection === 'up') {
                    nextSectionIndex += 1;
                    scroll(obj);
                } else if (swipeDirection === 'down' && obj.style.transform !== 'translateY(0)') {
                    nextSectionIndex -= 1;
                    scroll(obj);
                }
                e.stopPropagation();
            }
        }
    }, false);
}

//버튼을 통해 스크롤이벤트 동작 함수
function move(sectionIdx) {
    nextSectionIndex = sectionIdx;
    scroll(container);
}

//스크롤이벤트 binding
container.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && nextSectionIndex > TOP_SECTION_INDEX) {
        nextSectionIndex -= 1;
    } else if (e.deltaY > 0 && nextSectionIndex < BOTTOM_SECTION_INDEX) {
        nextSectionIndex += 1;
    }
    e.stopPropagation();
});

container.addEventListener('wheel', scroll);
swipe(container);