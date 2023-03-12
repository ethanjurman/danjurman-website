let savedScrollVertical = 0;

function showCaseAtStart() {
  if (window.location.hash) {
    const showCaseArtTile = [...document.getElementsByTagName("art-tile")].filter(artTile => {
      return window.location.hash === `#${artTile.getAttribute('data-title').replace(/\W/g, "")}`;
    })
    showcaseImage(showCaseArtTile[0]);
  }
}

function leaveShowcaseImage() {
  const showcaseTile = document.querySelector("showcase-tile");
  showcaseTile.innerHTML = `
    <showcase-description>
      <showcase-back-button style="display:none">back</showcase-back-button>
    </showcase-description>
    <showcase-image></showcase-image>
  `;

  // hide hr element
  document.querySelector('hr').setAttribute("style", "display: none");

  processArtTiles();
  resetHash();

  scrollTo({ top: savedScrollVertical, behavior: "smooth" });
}

function showcaseImage(artTile) {
  // set hash
  savedScrollVertical = document.body.scrollTop;
  window.location.hash = artTile.getAttribute('data-title').replace(/\W/g, "");


  // re-process all the tiles to put everything in the column it was in
  processArtTiles();

  // append this art tile to the top showcase tile (moving it from where it was in the grid)
  const showcaseTile = document.querySelector("showcase-tile");
  showcaseTile.querySelector("showcase-image").appendChild(artTile);

  const showcaseDescription = showcaseTile.querySelector(
    "showcase-description"
  );
  showcaseDescription.innerHTML = `
    <showcase-back-button onclick="leaveShowcaseImage()">back</showcase-back-button>
    <h2>${artTile.getAttribute("data-title")}</h2>
    <p><i>${artTile.getAttribute("data-publication")}</i></p>
    <p>${artTile.getAttribute("data-description")}</p>
  `;

  // show hr element
  document.querySelector('hr').setAttribute("style", "");

  scrollTo({ top: 0, behavior: "smooth" });
}
