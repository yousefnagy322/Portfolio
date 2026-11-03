document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-image-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide], .shot')];
    slides.forEach((slide) => slide.setAttribute('data-carousel-slide', ''));
    if (slides.length === 0) return;

    if (carousel.closest('#projects')) {
      const resizeDeviceFrames = () => {
        carousel.querySelectorAll('.device-mockup-frame').forEach((frame) => {
          const image = frame.querySelector('img');
          if (!image?.naturalWidth || !image.naturalHeight) return;

          const frameStyle = getComputedStyle(frame);
          const horizontalBorders = parseFloat(frameStyle.borderLeftWidth) + parseFloat(frameStyle.borderRightWidth);
          const verticalBorders = parseFloat(frameStyle.borderTopWidth) + parseFloat(frameStyle.borderBottomWidth);
          const screenWidth = Math.max(0, parseFloat(frameStyle.width) - horizontalBorders);
          const fittedHeight = screenWidth / (image.naturalWidth / image.naturalHeight) + verticalBorders;

          if (Math.abs(parseFloat(frameStyle.height) - fittedHeight) > 0.5) {
            frame.style.height = `${fittedHeight}px`;
          }
        });
      };

      carousel.querySelectorAll('.device-mockup-frame img').forEach((image) => {
        image.addEventListener('load', resizeDeviceFrames);
        if (image.complete) resizeDeviceFrames();
      });

      const frameResizeObserver = new ResizeObserver(resizeDeviceFrames);
      frameResizeObserver.observe(carousel);
      requestAnimationFrame(resizeDeviceFrames);
    }

    const createButton = (direction) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `carousel-arrow carousel-arrow--${direction}`;
      button.setAttribute('data-carousel-step', direction === 'previous' ? '-1' : '1');
      button.setAttribute('aria-label', `${direction === 'previous' ? 'Previous' : 'Next'} screenshot`);
      button.innerHTML = `<i class="fas fa-chevron-${direction === 'previous' ? 'left' : 'right'}" aria-hidden="true"></i>`;
      carousel.append(button);
      return button;
    };

    const controlsScope = carousel.closest('.screenshots-section') || carousel;
    const previous = carousel.querySelector('[data-carousel-prev], [data-gallery-prev]') || controlsScope.querySelector('[data-carousel-prev], [data-gallery-prev]') || createButton('previous');
    const next = carousel.querySelector('[data-carousel-next], [data-gallery-next]') || controlsScope.querySelector('[data-carousel-next], [data-gallery-next]') || createButton('next');
    if (!carousel.contains(previous)) carousel.append(previous);
    if (!carousel.contains(next)) carousel.append(next);
    previous.classList.add('carousel-arrow', 'carousel-arrow--previous');
    next.classList.add('carousel-arrow', 'carousel-arrow--next');
    previous.disabled = false;
    next.disabled = false;
    let pagination = carousel.querySelector('[data-carousel-pagination]') || controlsScope.querySelector('[data-carousel-pagination]');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.className = 'carousel-pagination';
      pagination.setAttribute('data-carousel-pagination', '');
      pagination.setAttribute('aria-label', 'Choose a screenshot');
    }
    if (!carousel.contains(pagination)) carousel.append(pagination);

    let counter = carousel.querySelector('[data-carousel-counter]') || controlsScope.querySelector('[data-carousel-counter], [data-gallery-count]');
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'carousel-counter';
      counter.setAttribute('data-carousel-counter', '');
      counter.setAttribute('aria-live', 'polite');
    }
    if (!carousel.contains(counter)) carousel.append(counter);

    const hasDots = slides.length > 1 && slides.length <= 7;
    pagination.hidden = !hasDots;
    counter.hidden = slides.length <= 1 || hasDots;
    const dots = [];

    if (hasDots) {
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Show screenshot ${index + 1} of ${slides.length}`);
        dot.setAttribute('aria-pressed', 'false');
        dot.addEventListener('click', () => showSlide(index));
        pagination.append(dot);
        dots.push(dot);
      });
    }

    let activeIndex = 0;
    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      const focusedSlide = slides.find((slide) => slide.contains(document.activeElement));
      if (focusedSlide && focusedSlide !== slides[activeIndex]) carousel.focus({ preventScroll: true });
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        slide.hidden = !active;
        slide.setAttribute('aria-hidden', String(!active));
        if (active) {
          const image = slide.querySelector('img');
          if (image) image.loading = 'eager';
        }
      });
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute('aria-pressed', String(dotIndex === activeIndex));
        if (dotIndex === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      counter.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    previous.addEventListener('click', () => showSlide(activeIndex - 1));
    next.addEventListener('click', () => showSlide(activeIndex + 1));
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(activeIndex + 1);
      }
    });

    let touchStartX = null;
    carousel.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') touchStartX = event.clientX;
    }, { passive: true });
    carousel.addEventListener('pointerup', (event) => {
      if (touchStartX === null) return;
      const delta = event.clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) < 48) return;
      showSlide(activeIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });
    carousel.addEventListener('pointercancel', () => { touchStartX = null; }, { passive: true });

    showSlide(0);
  });
});
