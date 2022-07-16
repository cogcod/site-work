// Dropdown menu
$(function () {
  const gnb = $(".gnb");
  const lnb = $(".lnb");
  const lnb_bg = $(".lnb_bg");
  const sub = $(".lnb_menu ol li a");

  gnb.mouseover(function () {
    $(this).addClass("active");
    lnb_bg.stop().slideDown(500);
  });

  gnb.mouseout(function () {
    $(this).removeClass("active");
    lnb_bg.stop().slideUp(100);
  });
});

// Visual Slide
$(function () {
  const slides = $(".slides");
  const slide = $(".slides > li");
  const slideCount = slide.length;
  const pagination = $(".pagination > li");
  const btnPrev = $(".prev");
  const btnNext = $(".next");
  const btnPlay = $(".play");
  const btnPause = $(".pause");
  let nowIdx = 0;
  let intervalKey = "";

  // moveSlide
  function moveSlide() {
    slides.stop().animate({ left: -(100 * nowIdx) + "%" }, 400);
    pagination.eq(nowIdx).addClass("on").siblings().removeClass("on");
  }

  // autoPlay
  function autoPlay() {
    intervalKey = setInterval(function () {
      if (nowIdx < 1) {
        nowIdx++;
      } else {
        nowIdx = 0;
      }
      moveSlide();
    }, 3000);
  }

  pagination.click(function (evt) {
    evt.preventDefault();
    nowIdx = pagination.index(this);
    moveSlide();
  });

  btnPrev.click(function (evt) {
    clearInterval(intervalKey);
    if (nowIdx > 0) {
      nowIdx--;
    } else {
      nowIdx = 1;
    }
    moveSlide();
  });

  btnNext.click(function (evt) {
    clearInterval(intervalKey);
    if (nowIdx < 1) {
      nowIdx++;
    } else {
      nowIdx = 0;
    }
    moveSlide();
  });

  btnPlay.click(function () {
    btnPause.addClass("on").siblings().removeClass("on");
    autoPlay();
  });

  btnPause.click(function () {
    clearInterval(intervalKey);
    btnPlay.addClass("on").siblings().removeClass("on");
  });

  $(window).load(function () {
    clearInterval();
    autoPlay();
  });
});
