$(function () {

    // 点击事件封装
    var UA = window.navigator.userAgent;
    var CLICK = 'click';
    if (/ipad|iphone|android/.test(UA)) {
        CLICK = 'tap';
    }

    var msg = $('#J_Msg');
    var timer1 = null;

    function showBox() {
        msg.css('visibility', 'visible').attr('class', 'msg BounceInB');
    }
    function hideBox() {
        msg.attr('class', 'msg BounceOutB');
    }

    // 收藏s
    $('.fav').on(CLICK, function() {
        msg.css({'width':'110px', 'margin-left':'-55px'});
        if (!this.classList.contains('select')) {
            this.classList.add('select');
            msg.text('收藏成功');
        } else {
            this.classList.remove('select');
            msg.text('已取消收藏');
        }
        clearTimeout(timer1);
        showBox();
        timer1 = setTimeout(function() {
            hideBox();
        }, 1500);
    });

    // 收藏e

    // 模拟点击active事件
    $('.header .icon, .btn, .header-sub .lb, .header-sub .rb, .tab-link li a, .art-ft .opt a, .dialog .ft a, .search-link a, .nav li a').on('touchstart', function() {
        var _this = this;
        var timer = null;

        clearTimeout(timer);
        $(this).addClass('active');
        timer = setTimeout(function() {
            $(_this).removeClass('active');
        }, 300);
    });

    // 详情页—点赞
    $('.opt-zan').on('click',function(){
        var $em = $(this).find('em'),
            iconzan = $(this).find('.icon-zan')
            num = parseFloat($em.text());
        msg.css({'width':'90px', 'margin-left':'-45px'});
        if (!this.classList.contains('on')) {
            this.classList.add('on');
            iconzan.addClass('on');
            iconzan.addClass('BounceInC');
            msg.text('赞+1');
            $em.text(num + 1);
        } else {
            this.classList.remove('on');
            iconzan.removeClass('on');
            iconzan.removeClass('BounceInC');
            msg.text('取消赞');
            $em.text(num - 1);
        }

        clearTimeout(timer1);
        showBox();
        timer1 = setTimeout(function() {
            hideBox();
        }, 1500);
    });



    //首页菜单
    var
        $maskTr = $('.mask-transparent'),
        $btnMenu = $('#J_BtnMenu'),
        $menu = $('#J_Menu');

    var timer_mask = null;

    function showMenu() {
        $menu.removeClass('none');
        $menu.addClass('show');
        $maskTr.removeClass('none');
        clearTimeout(timer_mask);
    }

    function hideMenu() {
        $menu.addClass('none');
        timer_mask = setTimeout(function () {
            $maskTr.addClass('none');
        }, 150);
    }

    $btnMenu.on(CLICK, function () {
        showMenu()
    });
    $maskTr.on({
        click: function () {
            hideMenu();
        },
        touchstart: function () {
            hideMenu();
        }
    });

    //滚动
    var myScroll;
    var myScroll2;
    var stopRolling = function (e) {
        e.preventDefault();
    };

    function loaded() {
        myScroll = new IScroll('#dropdown_scroller', {
            preventDefault: false
        });
        myScroll2 = new IScroll('#dropdown_sub_scroller', {
            preventDefault: false
        });
        document.addEventListener('touchmove', stopRolling, false);
    }
    //滚动e



    //菜单栏展开s
    function showMenu2() {
        $("body").addClass("nav-view");
        $(".navdrawer").css("display", "block");
        setTimeout(function () {
            document.addEventListener("touchmove", stopRolling, false)
        }, 502)
    }

    function hideMenu2() {
        $("body").removeClass("nav-view");
        setTimeout(function () {
            $(".navdrawer").css("display", "none")
        }, 502);
        document.removeEventListener("touchmove", stopRolling, false)
    }

    $(".navdrawer").css("display", "none");

    $("#list-btn").on("click", function () {
        if (!$("body").hasClass("nav-view")) {
            showMenu2()
        }
    });
    $(".navdrawer-mask").click(function () {
        hideMenu2()
    });
    //菜单栏展开e

    // tab
    var $tabTitItem = $('#select').find('li'),
        $tabCon = $('#J_TabCon'),
        $tabConMod = $tabCon.find('.mod'),
        $tabConItem = $tabConMod.find('.item'),
        $maskBl = $('.mask-black');

    $tabConItem.on(CLICK, function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    $tabTitItem.on(CLICK, function () {
        var index = $(this).index();
        $tabCon.removeClass('none');
        $tabTitItem.eq(index).addClass('active').siblings().removeClass('active');
        $tabConMod.eq(index).removeClass('none').siblings().addClass('none');
        $tabConMod.eq(index).addClass('dd').siblings().removeClass('dd');
        $('#J_TabTit').addClass('cur');
        showMaskB();
        loaded();
    });

    $maskBl.on({
        click: function () {
            $tabCon.addClass('none');
            $tabTitItem.removeClass('active');
            $('#J_TabTit').removeClass('cur');
            document.removeEventListener('touchmove', stopRolling, false);
            hideMaskB();
        }
    });

    function showMaskB() {
        $maskBl.removeClass('none');
    }

    function hideMaskB() {
        $maskBl.addClass('none');
    }

    // 发送给好友提示
    $('.share').on(CLICK, function(){
        $maskBl.show();
        $maskBl.children().show();
    });


    //展开收缩

    var $arrowFz = $('#fanzhuan'),
    //$arrowDown = $arrowFz.find('i');
        $useSm = $('#useTxt');

    $arrowFz.on(CLICK, function () {
        $useSm.toggle();
        //$arrowDown.toggleClass('active');
    });

    //回到顶部

    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".top-btn").fadeIn(200);
        }
        else {
            $(".top-btn").fadeOut(50);
        }
    });

    $(".top-btn").click(function () {
        $('body').animate({scrollTop: 0}, 500);
        return false;
    });


    //点的宽度
    var $pagCt = $('#pagination-ct'),
        $pagSpan = $pagCt.find('span').length,
        $pagWidth = $pagSpan * 14 + 20;
    //alert($pagSpan);
    $pagCt.css('width', $pagWidth);

    //翻页
    var pagecurrunt = $('.pager-current'),
        prever = $('.prever-btn'),
        next = $('.next-btn');

    function btnchange() {
        if (pagecurrunt.text = 1) {
            prever.addClass('disabled');
        } else {
            prever.removeClass('disabled');
        }
    }

    btnchange();




    //图片放大s
    var viewImage = $('#tiles li img'),
        bigImage = $('.bigimage'),
        newImage = $('.bigimage img'),
        maskBl2 = $('.mask-black2');


    viewImage.on(CLICK, function () {
        var img_src = $(this).attr('src');
        bigImage.removeClass('none');
        newImage.attr('src', img_src);
        document.addEventListener('touchmove', stopRolling, false);
        showMaskB2();

    });

    bigImage.on(CLICK, function () {
        bigImage.addClass('none');
        document.removeEventListener('touchmove', stopRolling, false);
        hideMaskB2();
    })
    maskBl2.on({
        click: function () {
            bigImage.addClass('none');
            document.removeEventListener('touchmove', stopRolling, false);
            hideMaskB2();
        }
    });
    function showMaskB2() {
        maskBl2.removeClass('none');
    }

    function hideMaskB2() {
        maskBl2.addClass('none');
    }

    //图片放大e




});

