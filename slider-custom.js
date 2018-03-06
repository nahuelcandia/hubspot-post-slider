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
  if($('#slider-horizontal').length > 0){
    $('#slider-horizontal').sliderPro({
  		width: '100%',
  		height: 500,
  		arrows: true,
  		buttons: false,
  		waitForLayers: true,
  		thumbnailWidth: 200,
  		thumbnailHeight: 100,
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
    $('.sp-slides').append(
      '<div class="sp-slide">'+
         '<img class="sp-image" src="https://cdn2.hubspot.net/hubfs/2661678/blank.gif" data-src="'+slide_image+'"'+ 'data-retina="'+slide_image+'">'+
         '<div class="sp-caption">'+
           '<h1 class="slide-counter">'+index+'/'+total_posts+'</h1>'+
           '<h1 class="post-title">'+slide_title+'</h1>'+
           '<div class="post-content">'+slide_content_html+'</div>'+
         '</div>'+
      '</div>'
    );
    if($('#slider-horizontal').length > 0){
      slide_content_txt = slide_content_txt.substr(0, (slide_content_txt.length-(slide_content_txt.length-55)))+'...';
      $('.sp-thumbnails').append(
        '<div class="sp-thumbnail">'+
          '<div class="sp-thumbnail-text">'+
             '<div class="sp-thumbnail-title">'+slide_title+'</div>'+
             '<div class="sp-thumbnail-description">'+slide_content_txt+'</div>'+
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
