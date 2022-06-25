// Dropdown menu 
$(function(){

    const gnb = $('.gnb');
    const lnb_bg = $('.lnb_bg');

    gnb.mouseover(function(){
        $(this).addClass('active');
        lnb_bg.stop().slideDown(100);
    });

    gnb.mouseout(function(){
        $(this).removeClass('active');
        lnb_bg.stop().slideUp(100);
    });

});


// Visual Slide
$(function(){

    const slides = $('.slides');
    const slide = $('.slides > li');
    const slideCount = slide.length;
    const pagination = $('.pagination > li');
    const btnPrev = $('.prev');
    const btnNext = $('.next');
    const btnPlay = $('.play');
    const btnPause = $('.pause');
    let nowIdx = 0;
    let intervalKey = '';

    // cloneSlides
    slides.append(slide.eq(0).clone().addClass('clone'));
    slides.prepend(slide.eq(1).clone().addClass('clone'));

    /* 
        에러)
        1. nowIdx가 슬라이드개수와 페이징개수가 맞지 않아서 그런지 페이지네이션이 활성화안됨 
        2. 이전버튼 누를때 슬라이드가 안멈춤 
        3. 슬라이드가 3->1, 0->2로 갈때 무빙이 두번되어 시간이 배로 걸림.. ㅠㅠ 할수있다..
    */

    /*
        - 인덱스는 이전, 다음버튼과 이미지에 기능하도록 
        - 인디케이터 : slide_1은 pg1에 'on'클래스, slide_2는 pg2에 'on'클래스 넣기 
    */

    function Idx(){
        if(slide.hasClass('slide_1')){
            $('.pg1').addClass('on').siblings().removeClass('on');
        }else if(slides.hasClass('slide_2')){
            $('.pg2').addClass('on').siblings().removeClass('on');
        }
    }


    // moveSlide
    function moveSlide(){
        slides.stop().animate({left:-(100*nowIdx)+"%"},400,function(){
            if(nowIdx == 3){
                slides.css({left: -100 + "%"});
            }else if(nowIdx == 0){
                slides.css({left: -200 + "%"});
            }
        });

        // pagination.eq(nowIdx).addClass('on').siblings().removeClass('on');
        // Idx();
    }

    // autoPlay
    function autoPlay(){
        intervalKey = setInterval(function(){
            if(nowIdx<3){
                nowIdx++;
            }else if(nowIdx = 2){
                nowIdx = 0;
            }
            moveSlide();
        },3000);
    }

    pagination.click(function(evt){
        evt.preventDefault();
        nowIdx = pagination.index(this);
        moveSlide();
    });

    btnPrev.click(function(evt){
        clearInterval(intervalKey);
        if(nowIdx>0){
            nowIdx--;
        }else if(nowIdx = 0){
            nowIdx = 2;
        }
        moveSlide();
    });

    btnNext.click(function(evt){
        clearInterval(intervalKey);
        if(nowIdx<3){
            nowIdx++;
        }else if(nowIdx = 2){
            nowIdx = 0;
        }
        moveSlide();
    });

    btnPlay.click(function(){
        btnPause.addClass('on').siblings().removeClass('on');
        autoPlay();
    });

    btnPause.click(function(){
        clearInterval(intervalKey);
        btnPlay.addClass('on').siblings().removeClass('on');
    });

    $(window).load(function(){
        clearInterval();
        autoPlay();
    });

});