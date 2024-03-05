let previewsList = $('.projects__list .preview');
let categoriesList = $('.projects__categories .category');
let projectSlidesList = $('.projects__carousel .swiper-slide');
let headerNav = $('.header .header__nav');
let headerActions = $('.header .header__actions');
let currentPreviewsList = [];
let currentPreviewsIndexesList = [];

for (let i = 0; i < previewsList.length; i++) {
  currentPreviewsList.push($(previewsList[i]));
}
currentPreviewsIndexesList = currentPreviewsList.map(item => {
  return item.data('project');
})

$('#top').css('marginTop', $('#header').height());
$('#top').css('height', $(window).height() - $('#header').height());

$('.header .header__actions .burger').on('click', () => {
  headerNav.addClass('show');

  setTimeout(() => {
    headerNav.addClass('animate');
    headerActions.addClass('open');
  }, 10)
})

$('.header .header__actions .close').on('click', () => {
  headerNav.removeClass('animate');
  headerActions.removeClass('open');

  setTimeout(() => {
    headerNav.removeClass('show');
  }, 190)
})

$('.header .header__service-link').on('click', function (e) {
  e.preventDefault();
  swiperServices.slideTo($(this).data('service-tab') - 1);
})

if ($(window).width() < 768) {
  $('.header__link-body').hide();
  $('.header__link-head').on('click', function() {
    $(this).toggleClass('active');
    $(this).next('.header__link-body').slideToggle();
  });
}

$('.projects__list .preview').on('click', function () {
  $('.projects__popup').addClass('show');
  swiperProjects.slideTo(currentPreviewsIndexesList.indexOf($(this).data('project')));

  setTimeout(() => {
    $('.projects__popup').addClass('animate');
    $('.projects__list').addClass('blur');
  }, 10)
})

$('.projects__carousel .project .close').on('click', function () {
  $('.projects__popup').removeClass('animate');
  $('.projects__list').removeClass('blur');

  setTimeout(() => {
    $('.projects__popup').removeClass('show');
  }, 190)
})

$('.header .header__projects-link').on('click', function () {
  $('.projects__categories .category')[$(this).data('filter')].click();
})

$('.header .header__service-link').on('click', function () {
  if ($(window).width() > 767) {
    return;
  }

  if ($($('.services-collapse .collapse-head')[$(this).data('collapse-service') - 1]).hasClass('active')) {
    return;
  }

  $('.services-collapse .collapse-head')[$(this).data('collapse-service') - 1].click();
})

$('.header .header__projects-link').on('click', function () {
  if ($(window).width() > 767) {
    return;
  }

  if ($($('.projects-collapse .collapse-head')[$(this).data('collapse-category') - 1]).hasClass('active')) {
    return;
  }

  $('.projects-collapse .collapse-head')[$(this).data('collapse-category') - 1].click();
})

$('.projects__categories .category').on('click', function () {
  currentPreviewsList = [];
  currentPreviewsIndexesList = [];

  if ($(this).hasClass('active')) {
    return;
  }

  for (let i = 0; i < categoriesList.length; i++) {
    $(categoriesList[i]).removeClass('active');
  }

  $(this).addClass('active');

  for (let i = 0; i < previewsList.length; i++) {
    $(previewsList[i]).show();
    $(projectSlidesList[i]).show();

    if ($(this).data('filter') === 0) {
      currentPreviewsList.push($(previewsList[i]));
    } else {
      if ($(this).data('filter') === $(previewsList[i]).data('filter')) {
        currentPreviewsList.push($(previewsList[i]));
      }
    }

    if ($(this).data('filter') !== 0 && $(this).data('filter') !== $(previewsList[i]).data('filter')) {
      $(previewsList[i]).hide();
      $(projectSlidesList[i]).hide();
    }
  }

  currentPreviewsIndexesList = currentPreviewsList.map(item => {
    return item.data('project');
  })

  swiperProjects.update();
})

$('.project .project__navigation .tab').on('click', function () {
  if ($(this).hasClass('active')) {
    return;
  }

  for (let i = 0; i < $(this).parent().find('.tab').length; i++) {
    $($(this).parent().find('.tab')[i]).removeClass('active');
    $($(this).parent().parent().parent().find('.project__photos').find('.photo')[i]).removeClass('active');

    if ($(this).data('photo') === $($(this).parent().parent().parent().find('.project__photos').find('.photo')[i]).data('photo')) {
      $($(this).parent().parent().parent().find('.project__photos').find('.photo')[i]).addClass('active');
    }
  }

  $(this).addClass('active');
})

$(window).on('click', function() {
  $('.projects__popup').removeClass('animate');
  $('.projects__list').removeClass('blur');

  setTimeout(() => {
    $('.projects__popup').removeClass('show');
  }, 190)
});

$('.projects__wrapper_desktop').on('click', function(e){
  e.stopPropagation();
});

$(document).ready(function() {
  $('.anchor-link').on('click', function (e) {
    let $this = $(this);
    e.preventDefault();

    if ($(window).width() < 768 && $(this).hasClass('title')) {
      return;
    }

    if ($(window).width() > 767 && $(this).hasClass('header__link_shadow')) {
      $(this).addClass('focus');

      setTimeout(() => {
        $this.removeClass('focus');
      }, 910);
    }

    headerNav.removeClass('animate');
    headerActions.removeClass('open');

    setTimeout(() => {
      headerNav.removeClass('show');
    }, 190);

    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 120
    }, 900, 'swing', function () {});
  });
});

function isInViewport(el) {
  let $this = $(el);
  let elementTop = $this.offset().top;
  let elementBottom = elementTop + $this.outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + window.innerHeight;

  return elementBottom - 130 > viewportTop && elementTop < viewportBottom;
}

let sections = $('section');
let anchors = $('.header .anchor-element');
let sectionsAll = [];
let sectionsActive = [];
let activeSectionId = '';
for (let i = 0; i < sections.length; i++) {
  sectionsAll.push(sections[i])
}

$(window).on('resize scroll', function() {
  for (let i = 0; i < anchors.length; i++) {
    $(anchors[i]).removeClass('active');
  }

  sectionsActive = sectionsAll.filter(section => {
    return isInViewport($(section));
  });

  activeSectionId = $(sectionsActive[0]).attr('id');
  $('.header__nav').find(`[data-link='${activeSectionId}']`).addClass('active');
});

$('.collapse-body').hide();
$('.collapse-head').on('click', function() {
  $(this).parent().parent().find('.collapse-head').not($(this)).removeClass('active');
  $(this).toggleClass('active');

  $(this).next('.collapse-body').slideToggle();
  $(this).parent().parent().find('.collapse-body').not($(this).next('.collapse-body')).slideUp();
});

$(document).ready(function() {
  $('.form .form__input.required').bind('input', function() {
    $(this).parent().parent().removeClass('error');
  })

  $('#formSubmit').click(function() {
    $("#formError").addClass('hide');

    let fieldsList = $('.quote .form .form__input.required');
    let hasEmptyField = false;

    for (let i = 0; i < fieldsList.length; i++) {
      if (!$(fieldsList[i]).val()) {
        $(fieldsList[i]).parent().parent().addClass('error');
        hasEmptyField = true;
      }
    }

    if (hasEmptyField) {
      return;
    }

    $.ajax({
      url: "/send.php",
      type: "post",
      data: {
        "name":    $('#formName').val(),
        "email":   $('#formEmail').val(),
        "phone":   $('#formPhone').val(),
        "msg":   $('#formMessage').val(),
      },
      beforeSend: function() {
        $("#formLoader").addClass('show');
      },
      error: function() {
        $("#formLoader").removeClass('show');
        $("#formError").removeClass('hide');
      },
      success: function() {
        $("#formError").addClass('hide');
        $("#formLoader").removeClass('show');
        $("#formContent").addClass('hide');
        $("#formSuccess").removeClass('hide');

        setTimeout(() => {
          $("#formContent").removeClass('hide');
          $("#formSuccess").addClass('hide');
        }, 5000);
      }
    });
  });
});
