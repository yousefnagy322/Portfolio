document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('project-theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  const applyTheme = (theme) => {
    document.body.classList.toggle('light-mode', theme === 'light');
    if (themeIcon) {
      themeIcon.classList.toggle('fa-moon', theme !== 'light');
      themeIcon.classList.toggle('fa-sun', theme === 'light');
    }
    themeToggle?.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  };

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (_) { /* Storage may be disabled. */ }
  applyTheme(savedTheme);
  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    try { localStorage.setItem('theme', nextTheme); } catch (_) { /* Keep the theme for this page view. */ }
    applyTheme(nextTheme);
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const cancerGallery = document.getElementById('cancerscan-gallery');
  if (cancerGallery) {
    const screenshots = [
      ['splash screen.png', 'Splash screen'], ['app language.png', 'Language selection'],
      ['login.png', 'Login screen'], ['register.png', 'Registration screen'],
      ['reset password.png', 'Reset password'], ['home.png', 'Home dashboard'],
      ['drawer.png', 'Navigation drawer'], ['test page.png', 'Skin test page'],
      ['image confirm.png', 'Image confirmation'], ['email confirmation.png', 'Email confirmation'],
      ['positive test.png', 'Positive result screen'], ['negative test.png', 'Negative result screen'],
      ['report history.png', 'Report history'], ['information.png', 'Information hub'],
      ['skin cancer info.png', 'Skin cancer information'], ['info 2.png', 'Information screen'],
      ['info 3.png', 'Information screen'], ['info 4.png', 'Information screen'],
      ['info 5.png', 'Information screen'], ['info 6.png', 'Information screen'],
      ['info 7.png', 'Information screen'], ['info 8.png', 'Information screen'],
      ['chatbot.png', 'AI chatbot assistant'], ['doctors list.png', 'Nearby doctors list'],
      ['doctors filter.png', 'Doctor filtering'], ['doctor details.png', 'Doctor details'],
      ['mab.png', 'Map view'], ['settings.png', 'Settings'], ['about us.png', 'About CancerScan']
    ];

    cancerGallery.innerHTML = screenshots.map(([file, caption]) => {
      const src = `../img/CancerScan/${encodeURIComponent(file).replace(/%2F/g, '/')}`;
      return `<figure class="shot"><img src="${src}" alt="CancerScan ${caption}" aria-label="Open full-size image: CancerScan ${caption}" role="button" loading="lazy" decoding="async" tabindex="0"><figcaption>${caption}</figcaption></figure>`;
    }).join('');
  }

  const lightbox = document.getElementById('project-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  let triggerImage = null;

  if (cancerGallery && lightbox && lightboxImage && lightboxCaption && lightboxClose) {
    const openLightbox = (image) => {
      triggerImage = image;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.closest('.shot')?.querySelector('figcaption')?.textContent || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      triggerImage?.focus();
    };

    cancerGallery.addEventListener('click', (event) => {
      const image = event.target.closest('.shot img');
      if (image) openLightbox(image);
    });
    cancerGallery.addEventListener('keydown', (event) => {
      const image = event.target.closest('.shot img');
      if (image && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openLightbox(image);
      }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'Tab') {
        event.preventDefault();
        lightboxClose.focus();
      }
    });
  }
});
