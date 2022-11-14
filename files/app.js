$(document).ready(function() {
    setTheme();
    loadNavs();
    addEvents();
    if(window.location.pathname == '/') {
        initSlickVideos();
        initSlickImages();
        $('.photos-box-wrapper').addClass('slicked-section');
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');
        $('body').addClass('mobile');
    }
    else {
        console.log('desktop');
        $('body').addClass('desktop');
    }
});

function setTheme() {
    var theme = sessionStorage.getItem('theme');
    console.log(theme);
    if(theme == null) {
        sessionStorage.setItem('theme', 'light');
        theme = 'light';
    }
    console.log('on load, theme', theme);
    $('html').addClass(theme);
    $('#theme-toggle').addClass(theme);
}

function initSlickVideos() {
    $('.video-clips .videos-group').slick({
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1
                }
            }
        ]
    });
}

function initSlickImages() {
    $('.image-viewer').slick({
        adaptiveHeight: true
    });
}

function addEvents() {
    $('.navbar a.name.homepage').on('click', function() {
        if(window.location.pathname == '/') {
            var scroll_speed = 800;
            if($(window).width() < 1080 && $(window).width() > 500) {
                scroll_speed = $(window).width();
            }
            $([document.documentElement, document.body]).animate({
                scrollTop: $('.hero-section').offset().top
            }, scroll_speed);
        }
        else {
            window.location.pathname = '/';
        }
    });

    $('.subnav:not(.read-nav) .subnav-item').on('click', function() {
        var id = $(this).attr('id').replace('-link', '');
        var scroll_speed = 800;
        if($(window).width() < 1080 && $(window).width() > 500) {
            scroll_speed = $(window).width();
        }
        $([document.documentElement, document.body]).animate({
            scrollTop: $(`#${id}`).offset().top - 130
        }, scroll_speed);
    });

    $('.portfolio-section .project > div').on('mouseover', function() {
        if(!$(this).parent().hasClass('active') && !$(this).parent().hasClass('transitioning')) {
            $(this).parent().addClass('hover');
        }
    });
    $('.portfolio-section .project > div').on('mouseout', function() {
        if(!$(this).parent().hasClass('active')) {
            $(this).parent().removeClass('hover');
        }
    });
    $('.portfolio-section .project > div').on('click', function() {
        $('.portfolio-section .project.active').addClass('transitioning');
        $('.portfolio-section .project.active').removeClass('active');
        $(this).parent().removeClass('hover');
        $(this).parent().addClass('active');
        setTimeout(function() {
            $('.portfolio-section .project.transitioning').removeClass('transitioning');
        }, 200);
    });
    $('.portfolio-section .project .close-x').on('click', function() {
        $('.portfolio-section .project.active').addClass('transitioning');
        $('.portfolio-section .project.active').removeClass('active');
        setTimeout(function() {
            $('.portfolio-section .project.transitioning').removeClass('transitioning');
        }, 200);
    });

    $('.videos-section .video-wrapper').on('mouseover', function() {
        if($('body').hasClass('desktop')) {
            $(this).find('video')[0].play();
        }
    });
    $('.videos-section .video-wrapper').on('mouseout', function() {
        if($('body').hasClass('desktop')) {
            $(this).find('video')[0].pause();
        }
    });

    $('.videos-section .video-wrapper').on('click', function() {
        var src = $(this).find('video.cover').attr('data-src');
        $(`.video-viewer video source[src="${src}"]`).parent().addClass('active');

        var title = $(`.video-viewer video source[src="${src}"]`).parent().attr('title');
        $('.video-viewer p.video-title').text(title);
        var link = $(`.video-viewer video source[src="${src}"]`).parent().attr('link');
        $('.video-viewer a.yt-link').attr('href', link);

        $('html').addClass('overlay-active');
        $('.overlay').addClass('active');
        $('.video-viewer').addClass('active');

        $('.video-viewer video.active')[0].play();
    });

    $('.video-viewer video').on('play', function() {
        if(!$(this).hasClass('active')) {
            $(this)[0].pause();
        }
    });

    $('.yt-link').on('click', function() {
        console.log('clicking away')
        $('video.active')[0].pause();
    });

    $('.photos-section .tile').on('click', function() {
        var src = $(this).attr('data-src');
        var alt = $(this).attr('alt');
        //$('.image-viewer img').attr('src', src);
        //$('.image-viewer img').attr('alt', alt);

        var image_class = $(this).attr('class').replace('tile ', '');
        console.log($(`.image-wrapper.${image_class}`));
        var index = Number($(`.image-wrapper.${image_class}`).first().attr('data-slick-index'));
        console.log(index);
        $('.image-viewer').slick('slickGoTo', index);

        $('html').addClass('overlay-active');
        $('.overlay').addClass('active');
        $('.photos-box-wrapper').addClass('active');
    });

    $('.overlay').on('click', function() {
        $('html').removeClass('overlay-active');
        $(this).removeClass('active');
        $('.photos-box-wrapper').removeClass('active');
        $('.video-viewer').removeClass('active');

        if($('.video-viewer video.active').length > 0) {
            $('.video-viewer video.active')[0].pause();
            $('.video-viewer video.active').removeClass('active');
        }
    });

    $('.close-x').on('click', function() {
        $('html').removeClass('overlay-active');
        $('.overlay').removeClass('active');
        $('.photos-box-wrapper').removeClass('active');
        $('.video-viewer').removeClass('active');

        if($('.video-viewer video.active').length > 0) {
            $('.video-viewer video.active')[0].pause();
            $('.video-viewer video.active').removeClass('active');
        }
    });

    $('.theme-toggle').on('click', function() {
        if($(this).hasClass('light')) {
            // turn dark mode on
            $(this).removeClass('light');
            $(this).addClass('dark');
            $('html').removeClass('light');
            $('html').addClass('dark');
            sessionStorage.setItem('theme', 'dark');
        }
        else {
            // turn light mode on
            $(this).removeClass('dark');
            $(this).addClass('light');
            $('html').removeClass('dark');
            $('html').addClass('light');
            sessionStorage.setItem('theme', 'light');
        }
    });

    $('.copyable').on('click', function(e) {
      const target = e.target.closest('.copyable')
      const copyText = target.innerText
      if ($('.copied')) {
        $('.copied').remove()
      }
      var sampleTextarea = document.createElement("textarea")
      document.body.appendChild(sampleTextarea)
      sampleTextarea.value = copyText
      sampleTextarea.select()
      document.execCommand("copy")
      document.body.removeChild(sampleTextarea)

      // pop-up saying "copied!"
      target.insertAdjacentHTML('beforeend', '<span class="copied">Copied!</span>')
      setTimeout(function() {
        $('.copied').addClass('fading')
      }, 1200)
    })

    $('#reading-toolbar .size-down').on('click', function() {
        var current_size = $('main.dnd p')[0].className;
        switch (current_size) {
            case "reading default":
                // minus-one
                $('main.dnd p').removeClass('default');
                $('main.dnd p').addClass('minus-one');
                sessionStorage.setItem('reading_size', 'minus-one');
                break;
            case "reading minus-one":
                // minus-two
                $('main.dnd p').removeClass('minus-one');
                $('main.dnd p').addClass('minus-two');
                sessionStorage.setItem('reading_size', 'minus-two');
                // disable button
                $(this).addClass('disabled');
                break;
            case "reading plus-one":
                // default
                $('main.dnd p').removeClass('plus-one');
                $('main.dnd p').addClass('default');
                sessionStorage.setItem('reading_size', 'default');
                break;
            case "reading plus-two":
                // plus-one
                $('main.dnd p').removeClass('plus-two');
                $('main.dnd p').addClass('plus-one');
                sessionStorage.setItem('reading_size', 'plus-one');
                $('#reading-toolbar .size-up').removeClass('disabled');
                break;
        }
    });

    $('#reading-toolbar .size-up').on('click', function() {
        var current_size = $('main.dnd p')[0].className;
        switch (current_size) {
            case "reading default":
                // plus-one
                $('main.dnd p').removeClass('default');
                $('main.dnd p').addClass('plus-one');
                sessionStorage.setItem('reading_size', 'plus-one');
                break;
            case "reading minus-one":
                // default
                $('main.dnd p').removeClass('minus-one');
                $('main.dnd p').addClass('default');
                sessionStorage.setItem('reading_size', 'default');
                break;
            case "reading minus-two":
                // minus-one
                $('main.dnd p').removeClass('minus-two');
                $('main.dnd p').addClass('minus-one');
                sessionStorage.setItem('reading_size', 'minus-one');
                $('#reading-toolbar .size-down').removeClass('disabled');
                break;
            case "reading plus-one":
                // plus-two
                $('main.dnd p').removeClass('plus-one');
                $('main.dnd p').addClass('plus-two');
                sessionStorage.setItem('reading_size', 'plus-two');
                $(this).addClass('disabled');
                break;
        }
    });

    $('#reading-toolbar .serif-style').on('click', function() {
        var serif_style = $('main.dnd')[0].className;
        if(!serif_style.includes('serif')) {
            $('main.dnd').addClass('serif');
            sessionStorage.setItem('serif_style', 'serif');
            // turn button to sans
            $(this).find('.serif').removeClass('active');
            $(this).find('.sans-serif').addClass('active');
        }
        else {
            $('main.dnd').removeClass('serif');
            sessionStorage.setItem('serif_style', 'sans-serif');
            // turn button to serif
            $(this).find('.sans-serif').removeClass('active');
            $(this).find('.serif').addClass('active');
        }
    });
}

function loadNavs() {
    if($('body').hasClass('chapter')) {
        $('.subnav.read-nav').append(`
            <div class="subnav-items">
                <a class="subnav-item" href="/dnd"><span class="text"><i class="fas fa-angle-double-left"></i></span></a>
                <a class="subnav-item" href="/dnd/chapter-1/"><span class="text">1</span></a>
                <a class="subnav-item" href="/dnd/chapter-2/"><span class="text">2</span></a>
                <a class="subnav-item" href="/dnd/chapter-3/"><span class="text">3</span></a>
                <a class="subnav-item" href="/dnd/chapter-4/"><span class="text">4</span></a>
                <!-- <a class="subnav-item" href="/dnd/chapter-5/"><span class="text">5</span></a> -->
            </div>
            <span class="hidenav-tab"><i class="fas fa-chevron-up"></i><i class="fas fa-chevron-down"></i></span>
        `);
    }
    else if($('body').hasClass('letter')) {
        $('.subnav.read-nav').append(`
            <div class="subnav-items">
                <a class="subnav-item" href="/dnd"><span class="text"><i class="fas fa-angle-double-left"></i></span></a>
                <a class="subnav-item" href="/dnd/letter-1/"><span class="text">1</span></a>
                <a class="subnav-item" href="/dnd/letter-2/"><span class="text">2</span></a>
                <a class="subnav-item" href="/dnd/letter-3/"><span class="text">3</span></a>
                <a class="subnav-item" href="/dnd/letter-4/"><span class="text">4</span></a>
                <a class="subnav-item" href="/dnd/letter-5/"><span class="text">5</span></a>
                <a class="subnav-item" href="/dnd/letter-6/"><span class="text">6</span></a>
                <a class="subnav-item" href="/dnd/letter-7/"><span class="text">7</span></a>
                <a class="subnav-item" href="/dnd/letter-8/"><span class="text">8</span></a>
                <a class="subnav-item" href="/dnd/letter-9/"><span class="text">9</span></a>
                <a class="subnav-item" href="/dnd/letter-10/"><span class="text">10</span></a>
                <a class="subnav-item" href="/dnd/letter-11/"><span class="text">11</span></a>
                <a class="subnav-item" href="/dnd/letter-12/"><span class="text">12</span></a>
                <a class="subnav-item" href="/dnd/letter-13/"><span class="text">13</span></a>
                <a class="subnav-item" href="/dnd/letter-14/"><span class="text">14</span></a>
                <a class="subnav-item" href="/dnd/letter-15/"><span class="text">15</span></a>
                <a class="subnav-item" href="/dnd/letter-16/"><span class="text">16</span></a>
                <a class="subnav-item" href="/dnd/letter-17/"><span class="text">17</span></a>
                <a class="subnav-item" href="/dnd/letter-18/"><span class="text">18</span></a>
                <!-- <a class="subnav-item" href="/dnd/letter-19/"><span class="text">19</span></a>
                <a class="subnav-item" href="/dnd/letter-20/"><span class="text">20</span></a> -->
            </div>
            <span class="hidenav-tab"><i class="fas fa-chevron-up"></i><i class="fas fa-chevron-down"></i></span>
        `);
    }

    let pathname = window.location.pathname;
    $(`a.subnav-item[href="${pathname}"]`).addClass('active');

    // set up events
    $('.subnav.read-nav .hidenav-tab').on('click', function() {
        if($(this).parent().hasClass('shown')) {
            $(this).parent().removeClass('shown');
            $('main.dnd').removeClass('subnav-shown');
        }
        else {
            $(this).parent().addClass('shown');
            $('main.dnd').addClass('subnav-shown');
        }
    });
}