// this function help us whenever we want to iterate over a collection
// of dom elements, example: "document.querySelectorAll" this function
// will give us a collection of dom element so, they can not be iterated
// using a normal forEach function of ES5, we need to transform the collection
// to a normal and conventional array:
function nodesToArray(args) {
  return Array.prototype.slice.call(args);
};

// #1: inspect the markup html and prepare the "slider" object.
function inspectMarkup(callback) {
  // This function help us to check and get the element desired using
  // and identifier "id":
  function filterChild(chidren, className) {
    const index = nodesToArray(chidren).findIndex(function(element) {
      if (element.classList.contains(className)) {
        return true;
      };
    });
    if (index > -1) {
      return chidren[index];
    } else {
      return null;
    };
  };

  // We need the element with the selector "sl-container",
  // it has to have the image, title and their description,
  // So as you could see, it's a parent tag, and due that
  // we get an array of nodes:
  const slides = nodesToArray(document.querySelectorAll('.sl-container'));

  // The reduce function will give us an object with all the
  // images, titles, counters, descriptions and the thumbnails.
  // That object will be used in futures changes, it will be useful
  // because using an index we get the matched node
  // and replace the old one from the dom:
  const slider = slides.reduce((target, slide, index, array) => {
    const children = nodesToArray(slide.children),
      image = filterChild(children, 'sl-image'),
      title = filterChild(children, 'sl-title'),
      counter = document.createElement('span'),
      description = filterChild(children, 'sl-description');

    // Prepare "image":
    if (!image) {
      // Because the image wasn't using the "filterChild" function,
      // ww'll create a default image:
      image = document.createElement('img');
      image.classList.add('sl-image');
      image.setAttribute('src', 'http://www.51allout.co.uk/wp-content/uploads/2012/02/Image-not-found.gif');
    }
    image.setAttribute('tabindex', index);
    image.classList.add('sl-animate-fade');
    target.images.push(image);

    // Prepare "title":
    if (!title) {
      // Because the title wasn't using the "filterChild" function,
      // ww'll create a default title:
      title = document.createElement('h1');
      h1.classList.add('sl-title');
      h1.textContent = 'This is a title';
    };
    target.titles.push(title);

    // Prepare "counter":
    counter.classList.add('sl-counter');
    counter.innerText = (index + 1) + '/' + array.length;
    target.counters.push(counter);

    // Prepare "description":
    if (!description) {
      // Because the description wasn't using the "filterChild" function,
      // ww'll create a default description:
      description = document.createElement('p');
      description.classList.add('sl-description');
      description.textContent = 'Sample text description.';
    }
    target.descriptions.push(description);

    // Prepare "thumbnail":
    const thumbnail = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', image.src);
    img.classList.add('sl-thumbnail-image');
    img.setAttribute('tabindex', index);
    thumbnail.appendChild(img);
    thumbnail.classList.add('sl-thumbnail');
    // !!index && thumbnail.classList.add('sl-thumbnail-no-selected');
    if (index === 0) {
      thumbnail.classList.add('sl-thumbnail-active');
    } else {
      thumbnail.classList.add('sl-thumbnail-no-selected');
    }
    target.thumbnails.push(thumbnail);

    return target;
  }, {images: [], titles: [], counters: [], descriptions: [], thumbnails: []});

  // We perform the callback (if was passed as parameter) or
  // we return a new promise resolved to chain more functions
  return callback ? callback(slider) : Promise.resolve(slider);
};

// #2: render the new markup customized on the wrapper element.
function renderMarkup(slider, callback) {
  // We need this element because it's the root of all the slider,
  // and due that we need it to render the custom markup generated.
  // So, it's necessary to have it present always.
  const wrapper = document.querySelector('#sl-wrapper');

  // We do this because the map function will return a new array
  // with the markup of each thumbnail element, but it will then
  // rendered with each coma character of the array, so,
  // we use the "toString" function to convert the new array to text
  // and the we use the function "replace" to remove all the comas.
  // By doing this we ended up with a markup safe to render.
  const thumbnailsMarkup = slider.thumbnails
    .map(thumbnail => thumbnail.outerHTML)
    .toString()
    .replace(/,/g, '');

  // This markup is generated only in the first call of this function,
  // later we there are new changes, like a click to show a new images
  // this markup will persist regardless the new updates.
  // The statements like this one: "slider.image[0]"
  // are using the index of "0" because this is the initial render
  // so, in future updates it's gonna be changed because it will be dinamyc.
  wrapper.innerHTML = `
    <!-- SVG Symbols -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="sl-icon-prev" viewBox="0 0 557 560">
        <rect width="557" height="560" fill="#FDAAAD" rx="40"/>
        <path d="M166 282l-1-1L305 58l85 53-106 169 109 168-84 55-143-221z"/>
      </symbol>
      <symbol id="sl-icon-next" viewBox="0 0 557 560">
        <rect width="557" height="560" fill="#FDAAAD" rx="40"/>
        <path d="M392 282l1-1L253 58l-85 53 106 169-109 168 84 55 143-221z"/>
      </symbol>
    </svg>
    <!-- Slider -->
    <div class="sl-container">
      <div class="sl-image-container">
        <div class="sl-icon-prev">
          <svg class="sl-icon">
            <use xlink:href="#sl-icon-prev"/>
          </svg>
        </div>
        ${slider.images[0].outerHTML}
        <div class="sl-icon-next">
          <svg class="sl-icon">
            <use xlink:href="#sl-icon-next"/>
          </svg>
        </div>
      </div>
      <div class="sl-info">
        ${slider.titles[0].outerHTML}
        ${slider.counters[0].outerHTML}
      </div>
      ${slider.descriptions[0].outerHTML}
      <!-- Thumbnails -->
      <div class="sl-thumbnails-container">
        <div class="sl-icon-prev">
          <svg class="sl-icon">
            <use xlink:href="#sl-icon-prev"/>
          </svg>
        </div>
        <ul class="sl-thumbnails">
          ${thumbnailsMarkup}
        </ul>
        <div class="sl-icon-next">
          <svg class="sl-icon">
            <use xlink:href="#sl-icon-next"/>
          </svg>
        </div>
      </div>
    </div>
  `;

  // We perform the callback (if was passed as parameter) or
  // we return a new promise resolved to chain more functions.
  return callback
    ? callback(wrapper)
    : Promise.resolve({ slider, wrapper });
};

// #3: watch changes like clicks.
function watchChanges({ slider, wrapper }) {
  // We use the concept of "state" because we will mutate some metada
  // like the index to change the image whenever the user clicks.
  // we also do a shallow copy of the slider on the state to keep the values
  // in a main namespace instead of looking them around over the entire script.
  const state = {
    index: 0,
    ...slider
  };

  // UPDATES: Apply changes directly in the DOM:
  function updateState(indexOrDirection) {
    if (typeof indexOrDirection === 'string') {
      if (indexOrDirection === 'next') {
        if (state.index === state.images.length - 1) {
          state.index = 0;
        } else {
          state.index++;
        };
      } else {
        if (state.index === 0) {
          state.index = state.images.length - 1;
        } else {
          state.index--;
        };
      };
    } else {
      state.index = indexOrDirection;
    };
  };
  function updateImage() {
    const container = document.querySelector('.sl-image-container');
    const oldImage = document.querySelector('.sl-image');
    const newImage = state.images[state.index];
    container.replaceChild(newImage, oldImage);
  };
  function updateInfo() {
    const container = document.querySelector('.sl-container');
    const info = document.querySelector('.sl-info');

    // TITLE:
    const oldTitle = document.querySelector('.sl-title');
    const newTitle = state.titles[state.index];
    info.replaceChild(newTitle, oldTitle);

    // COUNTER:
    const oldCounter = document.querySelector('.sl-counter');
    const newCounter = state.counters[state.index];
    info.replaceChild(newCounter, oldCounter);

    // DESCRIPTION:
    const oldDescription = document.querySelector('.sl-description');
    const newDescription = state.descriptions[state.index];
    container.replaceChild(newDescription, oldDescription);
  };
  function updateThumbails(direction) {
    const thumbnails = nodesToArray(document.getElementsByClassName("sl-thumbnail"));
    thumbnails.forEach((thumbnail, index) => {
      if (state.index === index) {
        thumbnail.classList.remove('sl-thumbnail-no-selected');
        thumbnail.classList.add('sl-thumbnail-active');
        !!direction && (direction === 'next'
          ? updateScrollNext
          : updateScrollPrev
        )(thumbnail, index);
      } else {
        thumbnail.classList.add('sl-thumbnail-no-selected');
        thumbnail.classList.remove('sl-thumbnail-active');
      };
    });
  };
  function updateScrollNext(thumbnail, index) {
    const parent = thumbnail.parentNode;
    let x = parent.scrollLeft;

    if (index === 0) {
      x = 0;
    } else {
      x = parent.scrollLeft + thumbnail.scrollWidth;
    };

    parent.scrollTo(x, 0);
  };
  function updateScrollPrev(thumbnail, index) {
    const parent = thumbnail.parentNode;
    let x = parent.scrollLeft;

    if (index === parent.children.length-1) {
      x = parent.scrollWidth;
    } else {
      x = parent.scrollLeft - thumbnail.scrollWidth;
    };

    parent.scrollTo(x, 0);
  };

  // EVENT HANDLERS: watch for new updates:
  function onPrev(e) {
    // Stop bubbling:
    e.preventDefault();
    e.stopPropagation();

    // Update nodes:
    if (e.type === 'mouseup' || e.type === 'touchend') {
      wrapper.classList.remove('sl-avoid-user-select');
    } else {
      wrapper.classList.add('sl-avoid-user-select');
      updateState('prev');
      updateImage()
      updateInfo();
      updateThumbails('prev');
    };
  };
  function onNext(e) {
    // Stop bubbling:
    e.preventDefault();
    e.stopPropagation();

    // Update nodes:
    if (e.type === 'mouseup' || e.type === 'touchend') {
      wrapper.classList.remove('sl-avoid-user-select');
    } else {
      wrapper.classList.add('sl-avoid-user-select');
      updateState('next');
      updateImage()
      updateInfo();
      updateThumbails('next');
    };
  };
  function onThumbnail(e) {
    // Stop bubbling:
    e.preventDefault();
    e.stopPropagation();

    // Update nodes:
    updateState(e.target.tabIndex);
    updateImage();
    updateInfo();
    updateThumbails();
  };

  // ATTACH EVENT HANDLERS:
  // Because a single element can have differents event we only attach
  // the relevant event handler:
  document.querySelector('#sl-icon-prev').addEventListener('mousedown', onPrev);
  document.querySelector('#sl-icon-prev').addEventListener('mouseup', onPrev);
  document.querySelector('#sl-icon-prev').addEventListener('touchstart', onPrev);
  document.querySelector('#sl-icon-prev').addEventListener('touchend', onPrev);
  document.querySelector('#sl-icon-next').addEventListener('mousedown', onNext);
  document.querySelector('#sl-icon-next').addEventListener('mouseup', onNext);
  document.querySelector('#sl-icon-next').addEventListener('touchstart', onNext);
  document.querySelector('#sl-icon-next').addEventListener('touchend', onNext);
  document.querySelectorAll('.sl-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', onThumbnail);
    thumbnail.addEventListener('touchend', onThumbnail);
  });
};

// Entry point:
inspectMarkup()
  .then(renderMarkup)
  .then(watchChanges);

/*
Author: Norman Carcamo
Date: 24/Apr/2018
*/
