
$(document).ready(function(){
  //выезжание параметром в разделе 'Пример запроса'
rolling_out_parameters();
//подсветка фигурных скобок при наведении
highlite_brackets('.manual-request__result-bracket', '.manual-request__result-lbracket');
//подсветка квадратных скобок при наведении
highlite_brackets('.manual-request__result-lbracket', '.manual-request__result-bracket');
closed_brackets();
//создание квадратных закрытых скобок  при клике 
closed_lbrackets();
// удаление закрытых фигурных скобок при нажатии на развернутый блок 
delete_closed_brackets();
// удаление закрытых квадратных скобок при нажатии на развернутый блок 
delete_closed_lbrackets();
//checkbox response
checkbox();
//мобильная навигация
mobile_navigation();
// лист с методами
methods_list();
//расскрытие сайдбара
slide_menu();
//дропдаун в примерах запроса
request_select();
//аккардеон серый блок
accordeon('.manual-block-hiden__title');
//белый блок аккардеон
accordeon('.manual-block-spoiler__title');
//Cкрытие пунктов документации
accordeon('.manual-rules__title');
//навигация - бегающая линия
navigation_slide('.sidebar');

navigation_slide('.list-mobile__result');

dropdown_open_up();

$(document).on('scroll', function () {
  dropdown_open_up();
});

$(window).resize(function () {
  dropdown_open_up();
})

});




//раскрытие бокового сайдбара

function slide_menu() {

  $('.sidebar-point').on('click', '.manual__link', function () {

    var dad = $(this).attr('data-type');

    $('.manual__link-sub[data-parent]').each(function () {
      if (($(this).attr('data-parent')) === (dad)) {
        $(this).attr('data-show', '1');

      } else {
        $(this).attr('data-show', '1');
      }

      if (($(this).attr('data-parent')) != (dad)) {
        $(this).attr('data-show', '0');
      }
    });
  });
}

//выезжание параметром в разделе 'Пример запроса'
function rolling_out_parameters() {

  $('.manual-request__btn').click(function () {
    $('.manual-request__data').toggleClass('active');
  });

}
// checkbox response
function checkbox() {
  //----СДЕЛАТЬ УНИВЕРСАЛЬНОЙ------------------ 
  $('.manual-checkbox__box').on('click', function () {
    if (($('.manual-checkbox').attr('data-active')) === ('no-active')) {
      $(this).parent().parent().attr('data-active', 'active');
      $('.manual-checkbox__value').text('1');
    } else {
      $(this).parent().parent().attr('data-active', 'no-active');
      $('.manual-checkbox__value').text('0');
    }
  })
}

function highlite_brackets(bl, bl_negative) {

  $(bl).mouseenter(function () {

    $(this).parent().children(bl).addClass('active');
    $(bl).not($(this).parent().children(bl)).removeClass('active');
    $('.manual-request__result__block').children(bl_negative).removeClass('active');

  });

}

//создание закрытых фигурных скобок при нажатии на развернутый блок 

function closed_brackets() {

  $('.manual-request__result-bracket').click(function () {

    $(this).parent().addClass('none');
    $('<span class="manual-request__closed"  id="closed">{...}</span>').insertBefore($(this).parent());

  });

}

//создание закрытых квадратных скобок при нажатии на развернутый блок 

function closed_lbrackets() {

  $('.manual-request__result-lbracket').click(function () {
    $(this).parent().addClass('none');
    $('<span class="manual-request__lclosed"  id="lclosed">[...]</span>').insertAfter($(this).parent().prev());

  });
}

// удаление закрытых фигурных скобок при нажатии на развернутый блок

function delete_closed_brackets() {

  $('.manual-request__result__block, .manual-request__result-inner').on('click', '.manual-request__closed', function () {

    $(this).next().removeClass('none');
    $(this).remove();

  });
}

// удаление закрытых квадратных скобок при нажатии на развернутый блок

function delete_closed_lbrackets() {
  $('.manual-request__result__block, .manual-request__result-inner').on('click', '.manual-request__lclosed', function () {

    $(this).parent().children().removeClass('none');
    $(this).remove();
  })
}

// мобильная навигация

function mobile_navigation() {

  var menu = $('.manuals-nav__menu');
  var navTitle = $('.manuals-nav__title');

  // при нажатии на дропдаун, открываем его содержимое 

  $('.manuals-nav__active, .manuals-nav__icon').on('click', function () {

    if (menu.attr('data-show') === ('0')) {
      menu.attr('data-show', '1');
      $('.manuals-nav').attr('data-focus', '1');
    } else {
      mobile_navigation_default(menu, navTitle);
    }

  });

  //при нажатии на раздел, открывается его меню

  navTitle.on('click', function () {

    if ($(this).attr('data-active') === ('no-active')) {
      $(this).attr('data-active', 'active').next().attr('data-show', '1');
      navTitle.not($(this)).attr('data-active', 'no-active').next().attr('data-show', '0');
    } else {
      $(this).attr('data-active', 'no-active').next().attr('data-show', '0');
    }

  });

  // устанавливаем в активное значение, значение выбранного раздела и его подраздел

  $('.manuals-nav__link').on('click', function () {

    var activeSubTitle = $('.manuals-nav__active-sub-title');
    var activeTitle = $('.manuals-nav__active-title');

    activeSubTitle.text($(this).text());
    activeTitle.text($(this).parent().parent().find(navTitle).text());
    mobile_navigation_default(menu, navTitle);

  });
}

// Установка мобильной навигации в начальное положение, сброс всех атрибутов
function mobile_navigation_default(variable, findEl) {
  variable.attr('data-show', '0');
  variable.find(findEl).attr('data-active', 'no-active').next().attr('data-show', '0');
  $('.manuals-nav').attr('data-focus', '0');
}

// список методов  
function methods_list() {

  var mobileMenu = $('.list-mobile__menu');

  $('.list').on('click', '.manual__link', function () {

    $('.list-mobile__search').val($(this).text());
    $('.list-mobile').css('display', 'block');
    $('.list').css('display', 'none');
    $('.list-mobile__result').attr('data-show', '1');

  });

  // при нажатии на ссылку  'Список методов'
  // скрывается дропдаун с методами и появляется просто весь список,

  $('#method-list').on('click', function () {
    $('.list-mobile').css('display', 'none');
    $('.list').css('display', 'block');
  })

  // сворачивание и разворачивание дропдауна
  $('.list-mobile__search, .list-mobile__icon').on('click', function () {

    if (mobileMenu.attr('data-show') === '0') {
      mobileMenu.attr('data-show', '1');
      $('.list-mobile__search').attr('data-focus', '1');
    } else {
      mobileMenu.attr('data-show', '0');
      $('.list-mobile__search').attr('data-focus', '0');
    }
  });

  // сворачивание дропдауна при выборе группы 
  //и установка выбранного значения в активное акно

  $('.menu__container').on('click', '.manual__link', function () {
    $('.list-mobile__search').val($(this).text());
    mobileMenu.attr('data-show', '0');
  });
}

// аккордеон 
function accordeon(block_name) {
  $(block_name).on('click', function () {
    if ($(this).parent().attr('data-active') === 'no-active') {
      $(this).parent().attr('data-active', 'active');
    } else {
      $(this).parent().attr('data-active', 'no-active');
    }
  });
}

// эффект пробегания в навгации

function navigation_slide(block_name) {

  var nav = $(block_name);
  //находим первую ссылку и ставим ей аттрибут "data-active = active"
  nav.find('a').eq(0).attr('data-active', 'active');

  // нициализация размеров при загрузке
  nav_line_load(nav);

  // при клике на ссылку, удаляем аттрибут "data-active = active"  у прошлой ссылки  
  nav.find('a').on('click', function () {
    nav_line_init(nav);
    $(this).attr('data-active', 'active').siblings('a').attr('data-active', 'no-active');
    nav_line_load(nav);
    //инициализация линиии в навигации
    nav_line_init(nav);
  });
}

//инициализация линиии в навигации
function nav_line_init(variable) {
  var linkHeight = variable.find('a[data-active = active]').height();
  var linkOffset = variable.find('a[data-active = active]').position().top;
  //Передаем вышевычесленные парамметры линии
  variable.find('.nav-line').css({
    'height': linkHeight,
    'top': linkOffset
  });
}

// нициализация размеров при загрузке
function nav_line_load(variable) {
  $(window).on('click resize', function () {
    nav_line_init(variable);
  });
}

function request_select() {

  // активация дропдауна
  dropdown_activ('.manual-request__select-box');

  //закрытие дропдауна при клике на значение
  $('.manual-request__select-val').on('click', function () {
    $(this).parent().attr('data-show', '0');
  });


  // передача значения в активное окно
  $('.manual-request__select-val').on('click', function () {
    $('.manual-request__select-active').html($(this).html());
  });
}


// активация дропдауна
function dropdown_activ(active_box) {
  $(active_box).on('click', function () {
    if ($(this).next().attr('data-show') === '0') {
      $(this).next().attr('data-show', '1');
    } else {
      $(this).next().attr('data-show', '0');
    }
  });
}


// Открытие дропдауна вверх при расстоянии от низа окна браузера
function dropdown_open_up() {
  //высота окна браузера
  var windowHeight = $(window).height();
  //высота элемента(дропдауны) 
  var list = $('.manual-request__select-menu').height();

  $('.manual-request__select').each(function () {

    var element = $(this);
    // ----задаем коэф.появления блоков при прокрутке
    if ($(window).width() >= 767) {
      //значение для десктопа
      overlap = 1;
    } else {
      //значение для мобильных устройств и планшетов
      overlap = 1.2;
    }

    height = element.offset().top / overlap + element.height() + 100 / overlap - windowHeight;

    if ($(document).scrollTop() >= height) {
      $(this).find('.manual-request__select-menu').addClass('down');
      $(this).find('.manual-request__select-menu').removeClass('reverse');

    } else {
      $(this).find('.manual-request__select-menu').addClass('reverse').removeClass('down');
    }
  });
}