

  "use strict";
  var images = [
             
             
             ];
  var slideFade = 1200000000000; 
  var slideDuration = 90000000000000; 

var img='';                                      
for(var i=0; i<images.length; i++)
img= img + '<img src="'+images[i]+'" />';      
$('#kenburns-bg').prepend(img);

             
 $(window).load(function () {
      $("#preload").css({
          display: 'none'
      });
      $("body").removeClass("preload");
      setUpSections();
    
      var options = {
          "speed": 4000, 
          "transition_speed": 500, 
          "sub_selector": ".rotate"
      };
      $("#rotate").rotator(options);
      
      $('.navigation .move a').click(function () {

          if (!isDesktop()) return;

          var target = $(this).attr('href');
          openContent(target, $(target).attr('data-direction'));
          return false;
      });
      $('.close').click(function () {
          closeContent($('section.active').attr('data-direction'));
          return false;
      });
  });

   $("#kenburns-bg").kenburnsy({
       fullscreen: true,
       duration: slideDuration,
       fadeInDuration: slideFade
   });


  $(document).keyup(function (e) {
      if (!isDesktop()) return;
      if (e.keyCode == 38) {
          if ($('#contact').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }
      if (e.keyCode == 39) {
          if (!$('section.active').length) openContent('#rules');
          else if ($('#brands').hasClass('active') && !$('#rules').hasClass('active')) closeContent($('section.active').attr('data-direction'))
      }

      if (e.keyCode == 37) {
          if (!$('section.active').length) openContent('#about');
          else if ($('#contact').hasClass('active') && !$('#about').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      if (e.keyCode == 40) {
          if (!$('section.active').length) openContent('#contact');
          else if ($('#about').hasClass('active') && !$('#rules').hasClass('active')) closeContent($('section.active').attr('data-direction'));
      }

      if (e.keyCode == 27) {
          closeContent($('section.active').attr('data-direction'))
      }

  });

  function setUpSections() {
      var sections = document.getElementsByTagName('body')[0].getElementsByTagName('section');

      for (var i = 0; i < sections.length; i++) {

          switch (sections[i].getAttribute('data-direction')) {

          case "from-bottom": 
              var _position = {
                  "top": "100%"
              };
              var _destination = {
                  top: "0"
              };
              var _headerDestination = {
                  top: "-100%"
              };
              var _headerOrigin = {
                  "top": "0"
              };
              break;

          case "from-left": 
              var _position = {
                  "left": "-100%",
                  "right": "100%"
              };
              var _destination = {
                  "left": "0",
                  "right": "0"
              };
              var _headerDestination = {
                  "left": "100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;

          case "from-right": 
              var _position = {
                  "left": "100%"
              };
              var _destination = {
                  "left": "0"
              };
              var _headerDestination = {
                  "left": "-100%"
              };
              var _headerOrigin = {
                  "left": "0"
              };
              break;
			  
			  case "from-top": 
              var _position = {
                  "bottom": "100%"
              };
              var _destination = {
                  bottom: "0"
              };
              var _headerDestination = {
                  top: "100%"
              };
              var _headerOrigin = {
                  "top": "0"
              };
              break;


          }

          sections[i].positions = _position;
          sections[i].destinations = _destination;
          sections[i].headerDestinations = _headerDestination;
          sections[i].headerOrigins = _headerOrigin;

      }
  }

  function openContent(_target, _direction) {

      if (!isDesktop()) return;

      var _element = document.querySelector(_target);

      $(_target).css(_element.positions).css({
          "z-index": 2
      }).animate(_element.destinations, "easeOutQuint", function () {
          $(_target).addClass('active')
      });
      $('header').animate(_element.headerDestinations, "easeOutQuint");

  }

  function closeContent(_direction) {

      var _target = 'section.active';
      var _element = document.querySelector(_target);

      $(_target).removeClass('active').delay(300).animate(_element.positions, "easeOutQuint", function () {
          $(this).css({
              "z-index": -99999
          })
      });
      $('header').delay(300).animate(_element.headerOrigins, "easeOutQuint");

  }

  function isDesktop() {
      if ($(window).width() >= 768) return true;
      else return false;
  }

 
  $('#subscribe-form').submit(function () {
      'use strict';   
      $('#response').html('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span><span class="bounce4"></span></div>');

      $.ajax({
          url: 'js/inc/store-address.php',
          data: 'ajax=true&email=' + escape($('#subscribe_email').val()),
          success: function (msg) {
              $('#response').html(msg);
          }
      });

      return false;
  });

 <!--

  $(document).ready(function () {
     'use strict';
      $('#contactForm .error').remove();
      var form = $('#contactForm'); 
      var submit = $('#contactForm_submit'); 
      var alertx = $('.successMsg'); 
      form.on('submit', function (e) {
      var hasError = false;
        $('.required').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    $(this).parent().append('<span class="error"><i class="fa fa-exclamation-triangle"></i></span>');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            e.preventDefault();
          $.ajax({
              url: 'js/inc/sendemail.php',
              type: 'POST', 
              dataType: 'html', 
              data: form.serialize(), 
              beforeSend: function () {
                  alertx.fadeOut();
                  submit.html('Sending....'); 
              },
              success: function (data) {
                  form.fadeOut(300);
                  alertx.html(data).fadeIn(1000); 
                  setTimeout(function() {
                    alertx.html(data).fadeOut(300);
                    $('#formName, #formEmail,#phone, #message').val('')
                    form.fadeIn(1800);
                }, 4000); 
              },
              error: function (e) {
                  console.log(e)
              }
          });
          $('.required').val('');
        }
        return false;    
      });
      
    $('#contactForm input').focus(function () {
        $('#contactForm .error').remove();
    });
    $('#contactForm textarea').focus(function () {
        $('#contactForm .error').remove();
    });
  });
  
  
        