if($('#slider-horizontal').length > 0){
  $('#slider-horizontal').append(
    '<div class="sp-slides"></div>'+
    '<div class="sp-thumbnails"></div>'
  );
} else {
  $('#slider-vertical').append(
    '<div class="sp-slides"></div>'+
    '<div class="sp-thumbnails"></div>'
  );
}

$.when(createSliders()).then(function(){
  $('.social-share-slider').show();
  $('.social-share-generic').css('visibility','hidden');
  $('.social-share-generic').css('height','10px !important');
  if($('#slider-horizontal').length > 0){
    $('#slider-horizontal').sliderPro({
  		width: '80%',
      captionFadeDuration: 100,
      fade: true,
      fadeOutPreviousSlide: true,
      autoHeight: true,
  		arrows: true,
  		buttons: false,
  		waitForLayers: true,
  		thumbnailWidth: 200,
  		thumbnailHeight: 'auto',
  		thumbnailPointer: true,
  		autoplay: false,
  		autoScaleLayers: false,
  		breakpoints: {
  			500: {
  				thumbnailWidth: 120,
  				thumbnailHeight: 50
  			}
  		}
  	});
    $('.sp-caption-container').css('width', $('#slider-horizontal').outerWidth());
  } else {
    $('#slider-vertical').sliderPro({
     width: 425,
     orientation: 'vertical',
     loop: false,
     arrows: true,
     buttons: false,
     autoplay: false,
     thumbnailsPosition: 'right',
     thumbnailPointer: true,
     thumbnailWidth: 290,
     breakpoints: {
       800: {
         thumbnailsPosition: 'bottom',
         thumbnailWidth: 270,
         thumbnailHeight: 100
       },
       500: {
         thumbnailsPosition: 'bottom',
         thumbnailWidth: 120,
         thumbnailHeight: 50
       }
     }
    });
    $('.sp-caption-container').css('width', $('#slider-vertical').outerWidth());
  }
});

function createSliders(){
  $('.post_slide').hide();
  var total_posts = $('.post_slide').length;
  $('.post_slide').each(function(index){
    index++;
    var slide_image = $(this).find('.post_img').attr('src');
    var slide_title = $(this).find('.post_title').text();
    var slide_content_html = $(this).find('.post_content').html();
    var slide_content_txt = $(this).find('.post_content').text();
    var image_height = $('#slider-vertical').outerHeight();
    $('.sp-slides').append(
      '<div class="sp-slide">'+
         '<img class="sp-image" src="https://cdn2.hubspot.net/hubfs/2661678/blank.gif" data-src="'+slide_image+'"'+ 'data-retina="'+slide_image+'">'+
         '<div class="sp-caption sp-grab">'+
           '<h1 class="slide-counter">'+index+'/'+total_posts+'</h1>'+
           '<h1 class="post-title">'+slide_title+'</h1>'+
           '<div class="post-content ">'+slide_content_html+'</div>'+
         '</div>'+
      '</div>'
    );
    if($('#slider-horizontal').length > 0){
      slide_content_txt = slide_content_txt.substr(0, (slide_content_txt.length-(slide_content_txt.length-55)))+'...';
      $('.sp-thumbnails').append(
        '<div class="sp-thumbnail" style="background-image: url('+slide_image+');">'+
          '<div class="sp-thumbnail-text">'+
             '<div class="sp-thumbnail-title"></div>'+
          '</div>'+
        '</div>'
      );
    } else {
      slide_content_txt = slide_content_txt.substr(0, (slide_content_txt.length-(slide_content_txt.length-45)))+'...';
      $('.sp-thumbnails').append(
        '<div class="sp-thumbnail">'+
          '<div class="sp-thumbnail-image-container"><img class="sp-thumbnail-image"'+ 'src="'+slide_image+'"></div>'+
          '<div class="sp-thumbnail-text">'+
             '<div class="sp-thumbnail-title">'+slide_title+'</div>'+
             '<div class="sp-thumbnail-description">'+slide_content_txt+'</div>'+
          '</div>'+
        '</div>'
      );
    }
    $(this).remove();
  });
}
$(document).ready(function() {


  $('.sp-slides-container .sp-previous-arrow').parent().append('<div class="sp-arrow arrow-thumbs-bg sp-arrow-bg-back"></div>');
  $('.sp-slides-container .sp-previous-arrow').appendTo(".sp-arrow-bg-back").css('left', '15px');

  $('.sp-slides-container .sp-next-arrow').parent().append('<div class="sp-arrow arrow-thumbs-bg sp-arrow-bg-next"></div>');
  $('.sp-slides-container .sp-next-arrow').appendTo(".sp-arrow-bg-next").css('right', '15px');



  $(document).on('click', '.next-post-slide', function() {
    $('.sp-fade-arrows .sp-next-arrow').click();x
  });
  $(document).on('click', '.previous-post-slide', function() {
    $('.sp-fade-arrows .sp-previous-arrow').click();
  });
  $('.sp-thumbnails-container').appendTo('.slider-pagination-bottom');
  $( window ).resize(function() {
    if($('#slider-horizontal').length > 0){
      $('.sp-caption-container').css('width', $('#slider-horizontal').outerWidth());
      $('.sp-thumbnails-container').css('width', $('.sp-image-container').outerWidth());
    } else {
      $('.sp-caption-container').css('width', $('#slider-vertical').outerWidth());
    }
  });
});
