$(document).ready(function() {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                title: "Menu",
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function() {
            cssmenu.prepend('<div id="menu-button"><span></span><span></span><span></span>' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $('#menu-ul');
                if (mainmenu.hasClass('open')) {
                    $("#menu-region").hide();
                    mainmenu.slideUp().removeClass('open');
                    $("#content-region").show();
                    //$("body").css("overflow-y", "scroll");
                } else {
                    $("#menu-region").show();
                    mainmenu.slideDown().addClass('open');
                    //$("body").css("overflow-y", "hidden");
                    /*if (settings.format === "dropdown") {
                        mainmenu.find('ul').slideDown();
                    }*/
                    $("#content-region").hide();
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideUp();
                    } else {
                        $(this).siblings('ul').addClass('open').slideDown();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
        });
    };
    /*$(".navy").menumaker({
        title: "导航",
        format: "multitoggle"
    }).hide();*/
    $('#menu-button').click(function() {
        $(this).toggleClass('open');
    });
    $("a.nav-href-tag").click(function() {
        var mainmenu = $('#menu-button').next('div').find('ul');
        if (mainmenu.hasClass('open')) {
            mainmenu.slideUp().removeClass('open');
            $("body").css("overflow-y", "scroll");
        } else {
            mainmenu.slideDown().addClass('open');
            $("body").css("overflow-y", "hidden");
            if (settings.format === "dropdown") {
                mainmenu.find('ul').slideDown();
            }
        }
    });
    /*new AnimOnScroll(document.getElementById('grid'), {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.2
    });*/
});