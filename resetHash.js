function resetHash() {
  // Prevent scrolling by storing the page's current scroll offset
  // scrollV = document.body.scrollTop;
  // scrollH = document.body.scrollLeft;

  window.location.hash = "";

  // Restore the scroll offset, should be flicker free
  // document.body.scrollTop = scrollV;
  // document.body.scrollLeft = scrollH;
}
