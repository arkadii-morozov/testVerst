$(window).on( "load", init);

function init(){    
    var count = false; // menu switch
    $('.menu-btn').on('click', function(){
        count = !count;
        if(count){
            $('.drop-nav-menu').slideDown(100);   
        } else{
            $('.drop-nav-menu').slideUp(100);
        }
    });
    // hide menu
    $(document).on('click', function(e){
        let target = e.target;
        let parentEl = target.parentElement.className;
        let gamburger = false;
        let dropNav = false;
        if (parentEl && parentEl=="menu-btn"){
            gamburger = true; // hide drop-menu
        }
        if (parentEl && parentEl=="drop-nav-menu") {
            dropNav = true;
        }
            
        if (target.className != "menu-btn" &&
            gamburger == false &&
            target.className != "drop-nav-menu" &&
            dropNav == false &&
            count ){
            count = !count;
            $('.drop-nav-menu').slideUp(100);
        }
    });
    // resize window
    $(window).resize(function() {
        var widthDisp = $(window).width()+16;
        if ( widthDisp >= 768 ){
             $('.drop-nav-menu').slideUp(20);
             count = false;
        }
    });

/*============ tooltipNew ==============*/
    var tooltipElem;
    var titleTooltip = '';
    $(document).on('mouseover', function(event) {
        var target = event.target;
        var tooltipHtml = target.dataset.tooltip;

        if (!tooltipHtml) return;

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltipNew';
        tooltipElem.innerHTML = tooltipHtml;

        $('body').append(tooltipElem);
        $(".tooltipNew").fadeIn(150);


        // спозиционируем его сверху от аннотируемого элемента (top-center)
        var coords = target.getBoundingClientRect();
        var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;

        if (left < 0) left = 0; // не заезжать за левый край окна

        var top = coords.top - tooltipElem.offsetHeight - 7;
        if (top < 50) { // если подсказка не помещается сверху, то отображать её снизу
            top = coords.top + target.offsetHeight + 18;
        }
        // if (top > 50) { // если подсказка не помещается сверху, то отображать её снизу
        //     top = coords.top + target.offsetHeight + 18 + 10;
        // }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    });

    $(document).on('mouseout', function(e) {
        var target = e.target;
        if (tooltipElem){
            $(".tooltipNew").fadeOut(150, function() {
                $(this).remove();
                if (target.title == '' && titleTooltip){
                    target.title = titleTooltip;
                    titleTooltip = '';
                }
            });
        }
    });
    /*============ end tooltipNew ================*/
};