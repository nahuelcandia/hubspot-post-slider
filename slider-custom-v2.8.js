var wrapper, containers, slider, state;

wrapper = document.querySelector('#sl-wrapper');
state = { indexSelected: 0 };
containers = getArrayFrom(document.querySelectorAll('#sl-container'));

slider = containers.reduce(function(target, container, index) {
  var elements = getArrayFrom(container.children);
  var img = filterElement(elements, 'sl-image');
  var title = filterElement(elements, 'sl-title');
  var description = filterElement(elements, 'sl-description');

  img.setAttribute('tabindex', index);

  target.images.push(img.src);

  target.titles.push(title);

  var counter = document.createElement('span');
  counter.setAttribute('class', 'counter');
  counter.innerText = (index + 1) + '/' + containers.length;
  target.counters.push(counter);

  // target.counters.push(`
  //   <span class="counter">
  //     ${index + 1}/${containers.length}
  //   </span>
  // `);

  target.descriptions.push(description);

  target.slides.push(`
    <div class="image-container">
      <div class="prev">
        <svg class="icon">
          <use xlink:href="#icon-prev"/>
        </svg>
      </div>
      ${img.outerHTML}
      <div class="next">
        <svg class="icon">
          <use xlink:href="#icon-next"/>
        </svg>
      </div>
    </div>
    <div class="info">
      ${title.outerHTML}
      <span class="counter">
        ${index + 1}/${containers.length}
      </span>
    </div>
    ${description.outerHTML}
  `);

  target.thumbnails += `
    <li class="sl-preview ${index === 0 ? '' : 'sl-preview-no-selected'}">
      <img class="sl-preview-img" src="${img.src}" tabindex="${index}"/>
    </li>`;

  return target;
}, {
  slides: [],
  images: [],
  titles: [],
  counters: [],
  descriptions: [],
  thumbnails: ''
});

function getArrayFrom(args) {
  return Array.prototype.slice.call(args);
};
function filterElement(elements, id) {
  var index = getArrayFrom(elements).findIndex(function(element) {
    if (element.id === id) {
      return true;
    };
  });
  if (index > -1) {
    return elements[index];
  } else {
    return null;
  }
}

function updateSlideFromArrows(direction) {
  var img = document.querySelector('#sl-image');

  if (direction === 'next') {
    if (state.indexSelected === slider.images.length - 1) {
    	state.indexSelected = 0;
    } else {
      state.indexSelected++;
    };
  } else {
    if (state.indexSelected === 0) {
      state.indexSelected = slider.images.length - 1;
    } else {
      state.indexSelected--;
    };
  }

  img.src = slider.images[state.indexSelected];

  if (img.className.search(/animateSlide/) === -1) {
    img.className += 'animateSlide';
  }
}
function updatePreviewFromArrows(direction) {
  var previews = document.getElementsByClassName("sl-preview");

  getArrayFrom(previews).forEach(function(preview, index) {
    if (state.indexSelected === index) {
      preview.className = preview.className.replace('sl-preview-no-selected', '');

      if (direction === 'next') {
        if (index === 0) {
          preview.parentNode.scrollTo(0, 0);
        } else {
          var x = preview.parentNode.scrollLeft;
          var w = preview.scrollWidth;
          preview.parentNode.scrollTo(x + w, 0);
        }
      } else {
        if (index === previews.length-1) {
          preview.parentNode.scrollTo(preview.parentNode.scrollWidth, 0);
        } else {
          var x = preview.parentNode.scrollLeft;
          var w = preview.scrollWidth;
          preview.parentNode.scrollTo(x - w, 0);
        }
      }
    } else {
      preview.className = 'sl-preview sl-preview-no-selected';
    }
  });
}
function updateSlideImage(e) {
  var img = document.querySelector('#sl-image');
  img.src = slider.images[state.indexSelected];
  if (img.className.search(/animateSlide/) === -1) {
    img.className += 'animateSlide';
  }
};
function updatePreview(e) {
  var previews = document.getElementsByClassName("sl-preview");
  getArrayFrom(previews).forEach(function(preview, index) {
    if (state.indexSelected === index) {
      preview.className = preview.className.replace('sl-preview-no-selected', '');
    } else {
      preview.className = 'sl-preview sl-preview-no-selected';
    }
  });
}
function updateInfo(e) {
  var container = document.querySelector('#sl-container');
  var info = document.querySelector('.info');

  // TITLE:
  var oldTitle = document.querySelector('#sl-title');
  var newTitle = slider.titles[state.indexSelected];
  info.replaceChild(newTitle, oldTitle);

  // COUNTER:
  var oldCounter = document.querySelector('.counter');
  var newCounter = slider.counters[state.indexSelected];
  info.replaceChild(newCounter, oldCounter);

  // DESCRIPTION:
  var oldDescription = document.querySelector('#sl-description');
  var newDescription = slider.descriptions[state.indexSelected];
  container.replaceChild(newDescription, oldDescription);
}
function onPrev(e) {
  if (e.type === 'mouseup' || e.type === 'touchend') {
    console.log('->', e.type);
    wrapper.className = wrapper.className.replace('avoid-user-select', '').trim();
  } else {
    wrapper.className += ' avoid-user-select';
    updateSlideFromArrows('prev');
    updatePreviewFromArrows('prev');
    updateInfo(e);
  };
}
function onNext(e) {
  if (e.type === 'mouseup' || e.type === 'touchend') {
    wrapper.className = wrapper.className.replace('avoid-user-select', '').trim();
  } else {
    wrapper.className += ' avoid-user-select';
    updateSlideFromArrows('next');
    updatePreviewFromArrows('next');
    updateInfo(e);
  };
}
function onPreview(e) {
  // Update index selected:
  state.indexSelected = e.target.tabIndex;

  // Update index selected:
  updateSlideImage(e);

  // Update title, counter & description:
  updateInfo(e);

  // Update the preview image selected:
  updatePreview(e);
}
function onAnimationEnd(el, fn) {
  [
    'animationend',
    'webkitAnimationEnd',
    'oanimationend',
    'MSAnimationEnd'
  ].forEach(function(animation) {
    el.addEventListener(animation, fn);
  });
}

function buildSlider({ slide, thumbnails }) {
  return `
    <!-- SVG Symbols -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-prev" viewBox="0 0 557 560">
        <rect width="557" height="560" fill="#FDAAAD" rx="40"/>
        <path d="M166 282l-1-1L305 58l85 53-106 169 109 168-84 55-143-221z"/>
      </symbol>
      <symbol id="icon-next" viewBox="0 0 557 560">
        <rect width="557" height="560" fill="#FDAAAD" rx="40"/>
        <path d="M392 282l1-1L253 58l-85 53 106 169-109 168 84 55 143-221z"/>
      </symbol>
    </svg>

    <!-- Slider -->
    <div id="sl-container" class="image">
      ${slide}

      <!-- Thumbnails -->
      <div class="slider-container">
        <div class="prev">
          <svg class="icon">
            <use xlink:href="#icon-prev"/>
          </svg>
        </div>
        <ul class="images">
          ${thumbnails}
        </ul>
        <div class="next">
          <svg class="icon">
            <use xlink:href="#icon-next"/>
          </svg>
        </div>
      </div>
    </div>
  `;
};

wrapper.innerHTML = buildSlider({
  slide: slider.slides[state.indexSelected],
  thumbnails: slider.thumbnails
});

document.querySelector('#icon-prev').addEventListener('mousedown', onPrev);
document.querySelector('#icon-prev').addEventListener('mouseup', onPrev);
document.querySelector('#icon-prev').addEventListener('touchstart', onPrev);
document.querySelector('#icon-prev').addEventListener('touchend', onPrev);

document.querySelector('#icon-next').addEventListener('mousedown', onNext);
document.querySelector('#icon-next').addEventListener('mouseup', onNext);
document.querySelector('#icon-next').addEventListener('touchstart', onNext);
document.querySelector('#icon-next').addEventListener('touchend', onNext);

document.querySelectorAll('.sl-preview').forEach(function(preview) {
  preview.addEventListener('click', onPreview);
  preview.addEventListener('touchend', onPreview);
});
onAnimationEnd(document.querySelector('#sl-image'), function(e) {
  if (e.target.className.includes('animateSlide')) {
    e.target.className = e.target.className.replace(/animateSlide/, '').trim();
  }
})
