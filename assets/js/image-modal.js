(() => {
  const dialog = document.getElementById('image-modal');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const preview = dialog.querySelector('.image-modal-image');
  const caption = dialog.querySelector('.image-modal-caption');
  let opener;

  document.querySelectorAll('.post a[href]').forEach(link => {
    const image = link.querySelector('img');
    if (!image || !/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(new URL(link.href).pathname)) return;

    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', 'image-modal');
    link.setAttribute('aria-label', `Enlarge image: ${image.alt || 'Post image'}`);
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      preview.src = link.href;
      preview.alt = image.alt;
      caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || '';
      caption.hidden = !caption.textContent;
      dialog.showModal();
      document.documentElement.classList.add('image-modal-open');
    });
  });

  dialog.querySelector('.image-modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('image-modal-open');
    preview.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
})();
