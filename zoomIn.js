function zoomIn(target) {
  const hash = window.location.hash.split('#')[1];
  const newHash = target.parentElement.textContent.replace(/\W/g, '');

  // determine what column we are in, and set that width to be wider
  let parentSection = parseInt(target.parentElement.parentElement.getAttribute('section'));
  const columnsContainer = document.querySelector('columns-container');
  const gridTemplate = columnsContainer.style.gridTemplateColumns.split(' ');
  // check if we were already wide (in which case, we should shrink)

  if (hash === newHash) {
    parentSection = -1;
  }
  const newGridTemplate = gridTemplate.map((_, index) => index === parentSection ? '2.75fr' : '1fr').join(' ');

  // scroll to the element that was clicked (if it's now out of view)
  let shouldScroll = true;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  function scroll() {
    target.scrollIntoView({ behavior: "auto", block: "center" });
    if (shouldScroll) {
      window.requestAnimationFrame(scroll);
    }
  }

  // wait until auto smooth scroll if finished, then scroll with zoomed element
  setTimeout(() => {
    columnsContainer.style.gridTemplateColumns = newGridTemplate;
    window.requestAnimationFrame(scroll)
  }, 200);
  setTimeout(() => { shouldScroll = false }, 1000);

  // set hash
  if (parentSection !== -1) {
    window.location.hash = target.parentElement.textContent.replace(/\W/g, '');
  }
  if (parentSection === -1) {
    resetHash();
  }
}