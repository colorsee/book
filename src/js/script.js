var _wr = function(type) {
  var orig = history[type]
  return function() {
    var rv = orig.apply(this, arguments)
    var e = new Event(type)
    e.arguments = arguments
    window.dispatchEvent(e)
    return rv
  }
}
history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState')

$(document).ready(function() {
  $('.book_topl_but span').click(function() {
    $(this)
      .toggleClass('bg_black')
      .siblings()
      .removeClass('bg_black')
  })
  $('.book_topl_but .bt_2').click(function() {
    $('.bok_Catalog').toggleClass('act')
    $(
      '.set_style,.search_box,.change_form,.mypsg_1,.mypsg_2,.mypsg_3'
    ).removeClass('act')
  })

  $('.book_topl_but .bt_3').click(function() {
    $(
      '.bok_Catalog,.set_style,.change_form,.mypsg_1,.mypsg_2,.mypsg_3'
    ).removeClass('act')
  })

  $('.book_topl_but .bt_5').click(function() {
    $('.change_form').toggleClass('act')
    $(
      '.set_style,.bok_Catalog,.search_box,change_form,.mypsg_1,.mypsg_2,.mypsg_3'
    ).removeClass('act')
  })
  $('.book_topr_but .bt_6').click(function() {
    $(
      '.set_style,.bok_Catalog,.search_box,change_form,.mypsg_2,.mypsg_3'
    ).removeClass('act')
  })
  $('.book_topr_but .bt_7').click(function() {
    $('.mypsg_2').toggleClass('act')
    $(
      '.set_style,.bok_Catalog,.search_box,change_form,.mypsg_1,.mypsg_3'
    ).removeClass('act')
  })
  $('.book_topr_but .bt_8').click(function() {
    $('.mypsg_3').toggleClass('act')
    $(
      '.set_style,.bok_Catalog,.search_box,change_form,.mypsg_1,.mypsg_2'
    ).removeClass('act')
  })
  $('.book_topr_but span').click(function() {
    $(this)
      .toggleClass('bg_black')
      .siblings()
      .removeClass('bg_black')
  })

  $('.box_l .close_but').click(function() {
    $(this)
      .find('span')
      .toggleClass('close')
    $('.box_l').toggleClass('left_0')
  })
  $('.box_r .close_but').click(function() {
    $(this)
      .find('span')
      .toggleClass('close')
    $('.box_r').toggleClass('right_0')
  })
  // $('.book').on('mousewheel DOMMouseScroll', function(e) {
  //   if (
  //     !$('.scroll_book').hasClass('act') &&
  //     $('.bok_item').hasClass('scrol_none')
  //   ) {
  //     var delta =
  //       (e.originalEvent.wheelDelta &&
  //         (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
  //       (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1))
  //     if (delta > 0) {
  //       $('.book_botomr .prve').click()
  //     } else if (delta < 0) {
  //       $('.book_botomr .next').click()
  //     }
  //   }

  $('.book_botomr .but').click(function() {
    var book_botomr_n = $('.book_botomr .num').val()
    $('.bok_item_list')
      .eq(parseInt(book_botomr_n))
      .addClass('act')
      .siblings()
      .removeClass('act')
  })

  $('.mypsg_2_spet span,.mypsg_3_spet span').click(function() {
    $(this)
      .addClass('bg_gary')
      .siblings()
      .removeClass('bg_gary')
  })

  $('.bok_mark').click(function() {
    alt_page('已加入标签')
  })

  $('.phone_list .close').click(function() {
    $('.phone_list').fadeOut()
  })
  $('.phone_set_list p .read').click(function() {
    $(this)
      .addClass('selcte')
      .siblings()
      .removeClass('selcte')
  })

  $('.phone_tool .fot span').click(function(e) {
    e.stopPropagation()
    var ths_ind = parseInt($(this).index())
    switch (ths_ind) {
      case 0:
        $('.phone_list_1').fadeIn()
        $('.phone_set,.phone_speet').fadeOut()
        break
      case 1:
        $('.phone_list_2').fadeIn()
        $('.phone_set,.phone_speet').fadeOut()
        break
      case 2:
        $('.phone_set').fadeToggle()
        $('.phone_speet').fadeOut()
        break
      case 3:
        $('.phone_speet').fadeToggle()
        $('.phone_set').fadeOut()
    }
  })
  $('.phone_tool').click(function() {
    $('.phone_tool,.phone_set,.phone_speet').fadeOut()
  })
  $('.phone_page .phone_cli_erea:nth-child(1)').click(function() {
    $('.book_botomr .prve').click()
  })
  $('.phone_page .phone_cli_erea:nth-child(2)').click(function() {
    $('.phone_tool').fadeIn()
  })
  $('.phone_page .phone_cli_erea:nth-child(3)').click(function() {
    $('.book_botomr .next').click()
  })
  $(document.body).on('click', '.annotation', function() {
    $(this).addClass('active')
  })
})
var alt_ps = true

function alt_page(txt) {
  if (!txt) {
    return
  }

  var timer = txt.length

  if (alt_ps) {
    alt_ps = false
    $('.alt_page').fadeIn()
    $('.alt_page span').text(txt)
    setTimeout(function() {
      $('.alt_page').fadeOut()
      alt_ps = true
    }, timer * 200)
  }
}
// function tip(txt) {
//   var timer = txt.length
//   console.log(timer)
//   if (alt_ps) {
//     alt_ps = false
//     $('.alt_page').fadeIn()
//     $('.alt_page span').text(txt)
//     setTimeout(function() {
//       $('.alt_page').fadeOut()
//       alt_ps = true
//     }, timer * 200)
//   }
// }
