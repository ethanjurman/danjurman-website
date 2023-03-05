let searchingInterval;
const searchHash = window.location.hash.split("#")[1];

function searchAndZoom() {
  const artTiles = document.querySelectorAll("art-tile");

  artTiles.forEach((tile) => {
    const elementHash = tile.textContent.replace(/\W/g, "");
    if (searchHash === elementHash) {
      resetHash();
      zoomIn(tile.firstElementChild);
      clearInterval(searchingInterval);
    }
  });
}

if (searchHash) {
  searchingInterval = setInterval(searchAndZoom, 500);
}
