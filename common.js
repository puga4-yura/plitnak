/*$(document).on('click','.dop-select>a',function () {
    var el=$(this).remove();
    $('.dop-select').prepend(el);
});
$(document).on('click','.dop-type>a',function () {
    var el=$(this).remove();
    $('.dop-type').prepend(el);
});*/
$(document).on('click','#calculate-size',function () {
    var calc={
        number:$('#number').val(),
        type:$('#type option:selected').text(),
        service:$('#service option:selected').text(),
    }
});

var regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
function checkData(selector, text) {
    $(selector).tooltip({
        'title': text,
        'placement': 'top'
    }).tooltip("show");
    setTimeout(function () {
        $(selector).tooltip('destroy');
    }, 2000);
}
$(document).on('submit', '.form', function (event) {
    event.preventDefault();
    var cl=$(this).attr('id');
    var is_calc=cl=='send-calc'?1:0
    var form = $(this).parent().parent().find('.close');
    var block = $(this);
    var name = block.find('.name').val();
    var phone = block.find('.phone').val();
    var email = block.find('.email').val();
    var topic = block.find('.topic').val();
    console.log(name, phone, topic);

    if (phone == "") {
        checkData('.phone', 'Введите Телефон');
        correctData = false;
    }
    if (phone != "" && !regexPhone.test(phone)) {
        checkData('.phone', 'Неверный формат введение');
        correctData = false;
    }
    var data = {
		
        phone: phone,
        name: name,
        email: email,
        topic: topic,
        number:$('#number').val(),
        type:$('#type option:selected').text(),
        service:$('#service option:selected').text(),
        is_calc:is_calc
    };
    console.log(data)
   
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: data,
            success: function (result) {
                 console.log(result);
                form.click();
                $('#overlay').fadeIn(500, function () {
                    $('#modal-end')
                        .css("display", "block")
                        .animate({opacity: 1}, 200);
                    console.log(1);
                    $('#overlay')
                        .css("display", "block")
                        .animate({opacity: 0.8}, 200);

                    $('#overlay, #modal-close').click(function () {
                        $('#overlay').fadeOut(1000, function () {
                            $('#modal-end, #overlay')
                                .css("display", "none")
                                .animate({opacity: 0}, 200);
                        });
                    });

                });

            }
        });
    

});

$(document).ready(function () {

    /*сравнювание*/
    $(".def").mousemove(function (e) {
        Y = Math.floor(e.pageY - $(this).offset().top - 122);
        var page_a = 261 - Y;
        if (Y < 0)
            Y = 0;
        if (Y > 339)
            Y = 339;
        $('.imga').css('height', Y);
        $('.line1').css('top', Y + 122);
        $('.imgb').css('height', page_a);
        $('.line1 ').css('left', 0);
    });
    
    /*выпадание при клике*/
    $('.text-answer').css({'display': 'none'});
    $('.text-answer.first').css({'display': 'block'});
    $('.text').click(function () {
        $('.text').not($(this)).removeClass('open');
        $('.text-answer').not($(this).next('.text-answer')).slideUp(300);
        $(this).next('.text-answer').slideToggle(300);
        $(this).toggleClass('open');
    });

    /*меню*/
    $(window).scroll(function () {
	    var HeaderHeignt = $(".bl1").height();
	    var navHeight = $(".navbar").outerHeight(true);
	    var scroll = $(window).scrollTop();
	    if (scroll >= HeaderHeignt) {
	    	$("div.bl1").css("padding-top", navHeight+'px');
	        $(".navbar").addClass("navbar-fixed-top");
	    }
	    else {
	        $(".navbar").removeClass("navbar-fixed-top");
	        $("div.bl1").css("padding-top", "0");
	    }
	});

    $("nav").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

});


    $('.close').on('click', function () {
        var obj=$(this).parent('div')
        var frame = obj.find('iframe').remove();
        console.log(frame);
        obj.find('.frame-bl').html(frame);
    });
    $("#back-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 500) {
            $(".navbar").addClass("navbar-fixed-top");
        } else {
            $(".navbar").removeClass("navbar-fixed-top");
        }
    });

