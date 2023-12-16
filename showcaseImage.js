function showcaseImageStart() {
  // show showcase at the top of the page
  if (window.location.hash) {
    const showCaseArtTile = [
      ...document.getElementsByTagName("art-tile"),
    ].filter((artTile) => {
      return (
        window.location.hash ===
        `#${artTile.getAttribute("data-title").replace(/\W/g, "")}`
      );
    });
    showcaseImage(showCaseArtTile[0]);
    setTimeout(() => scrollTo({ top: 0, behavior: "auto" }), 0);
  }

  // do not show showcase at the top of the page
  if (!window.location.hash) {
    const showcaseTile = document.querySelector("showcase-tile");
    // clear content? remove attributes?

    processArtTiles();
  }
}

function getExtraMedia(artTile) {
  const extraMediaArray = artTileItems.find(
    (item) => item.fields.title === artTile.getAttribute("data-title")
  ).fields.extraMedia;
  if (extraMediaArray) {
    return extraMediaArray.map((media) => generateMediaElement(media, true));
  }
  return [];
}

function showcaseImage(artTile) {
  // set hash
  window.location.hash = artTile.getAttribute("data-title").replace(/\W/g, "");

  // re-process all the tiles to put everything in the column it was in
  processArtTiles();

  // append this art tile to the top showcase tile (moving it from where it was in the grid)
  const showcaseTile = document.querySelector("showcase-tile");
  showcaseTile.setAttribute("art-title", artTile.getAttribute("data-title"));

  const showcaseImages = [];
  showcaseImages.push(artTile);
  // append the other images
  getExtraMedia(artTile).forEach((img) => showcaseImages.push(img));

  // replace all the existing images (including extras) with the new set of images
  showcaseTile.replaceChildren(...showcaseImages);

  showcaseTile.setAttribute(
    "art-description",
    artTile.getAttribute("data-description")
  );
  showcaseTile.setAttribute(
    "art-publication",
    artTile.getAttribute("data-publication")
  );
}

window.onpopstate = (event) => {
  showcaseImageStart();
};
