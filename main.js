/* snippet from contentful */
const client = contentful.createClient({
  space: "xi70tbeq36e3",
  environment: "master", // defaults to 'master' if not set
  accessToken: "if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM",
});

const MAX_COLUMNS = 3;

const artTileElements = [];
const topSubColumnsContainerElements = [];
const bottomSubColumnsContainerElements = [];
let columns = 0;

// build sub-columns-container elements based on the max number of columns there could be
function createSubColumnsContainerElements() {
  [...new Array(MAX_COLUMNS)].forEach(() => {
    const newSubColumnsContainerElement = document.createElement(
      "sub-columns-container"
    );
    newSubColumnsContainerElement.setAttribute("section", "top");
    newSubColumnsContainerElement.innerHTML = `
      <sub-tile-column section='0'></sub-tile-column>
      <sub-tile-column section='1'></sub-tile-column>
    `;
    topSubColumnsContainerElements.push(newSubColumnsContainerElement);
  });
  [...new Array(MAX_COLUMNS)].forEach(() => {
    const newSubColumnsContainerElement = document.createElement(
      "sub-columns-container"
    );
    newSubColumnsContainerElement.setAttribute("section", "bottom");
    newSubColumnsContainerElement.innerHTML = `
      <sub-tile-column section='0'></sub-tile-column>
      <sub-tile-column section='1'></sub-tile-column>
    `;
    bottomSubColumnsContainerElements.push(newSubColumnsContainerElement);
  });
}

// pull the entry for the main page (you can find this in contentful, info panel)
const mainPageEntry = "2FDoqwaVPKZiumNtdH86Ad";
client
  .getEntry(mainPageEntry)
  .then((entry) => {
    // create all the art-tile elements and push them to `artTileElements`
    // by doing this first, when we append later, the elements will just move to where they need to go
    entry.fields.artTiles.forEach(generateArtTile);
    createSubColumnsContainerElements();
    processArtTiles();
  })
  .catch(console.error);

// function to generate a video or image block, used for art-tiles
function generateMediaElement(media) {
  if (!media?.fields?.file) {
    console.warn("no file associated with media!", media);
    return null;
  }
  const { contentType, url } = media.fields.file;
  if (contentType.match("image")) {
    const mediaElement = document.createElement("img");
    mediaElement.src = url;
    return mediaElement;
  }
  if (contentType.match("video")) {
    const mediaElement = document.createElement("video");
    mediaElement.src = url;
    mediaElement.controls = false;
    mediaElement.autoplay = true;
    mediaElement.playsInline = true;
    mediaElement.loop = true;
    mediaElement.setAttribute("muted", "");

    return mediaElement;
  }

  // if we couldn't match with some filetype, warn here!
  console.warn(`unknown filetype!`, contentType);
}

// function to go through all the loaded art-tile elements (from contentful)
// and add then to the page
function processArtTiles() {
  // append top sub-columns container
  [...new Array(columns)].forEach((_, index) => {
    const topSubColumnsContainerElement = topSubColumnsContainerElements[index];
    document
      .querySelector(`tile-column[section="${index}"]`)
      .appendChild(topSubColumnsContainerElement);
  });

  // append tiles
  artTileElements.forEach((artTileElement, index) => {
    document
      .querySelector(`tile-column[section="${index % columns}"]`)
      .appendChild(artTileElement);
  });

  // append bottom sub-columns container
  [...new Array(columns)].forEach((_, index) => {
    const bottomSubColumnsContainerElement =
      bottomSubColumnsContainerElements[index];
    document
      .querySelector(`tile-column[section="${index}"]`)
      .appendChild(bottomSubColumnsContainerElement);
  });
}

// function to generate a single art tile, and save it to our list of artTileElements
function generateArtTile(artTile) {
  const { title, media, publication } = artTile.fields;
  // create tile
  const artTileElement = document.createElement("art-tile");
  artTileElement.setAttribute("data-title", title);
  const mediaElement = generateMediaElement(media);
  artTileElement.innerHTML = `
		${mediaElement.outerHTML}
		<art-title>${title}</art-title>
		<art-publication>${publication}</art-publication>
	`;

  // click action to make an image (and really, the entire column) larger
  artTileElement.onclick = (event) => {
    zoomIn(event.target);
  };

  // disable right click on art-tiles
  artTileElement.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  artTileElement.ondragstart = function () {
    return false;
  };

  artTileElements.push(artTileElement);
}

// function to recreate the tile containers based on the width of the page
function createTileContainers(numberOfTiles) {
  // clean up previous tile containers
  const parentContainer = document.querySelector("columns-container");
  parentContainer.innerHTML = "";
  parentContainer.style.gridTemplateColumns = `1fr ${numberOfTiles > 1 ? "1fr" : "0fr"
    } ${numberOfTiles > 2 ? "1fr" : "0fr"}`;

  // create new tile containers
  for (let i = 0; i < numberOfTiles; i++) {
    const tileColumnElement = document.createElement("tile-column");
    tileColumnElement.setAttribute("section", i);
    parentContainer.appendChild(tileColumnElement);
  }
}

/* We are using a resize observer here to listen for changes in the window width.
 * If we see that we should add/remove columns, we blow away the old ones, and create new columns.
 * We do this (as opposed to more traditional methods) because of the staggered column layout
 */
const resizeObserver = new ResizeObserver((entries) => {
  // determine how many tile containers we should make
  const newNumberOfColumns = Math.min(Math.ceil(window.innerWidth / 600), 3);
  if (columns !== newNumberOfColumns) {
    columns = newNumberOfColumns;
    // make tile containers
    createTileContainers(newNumberOfColumns);
    // re-generate art blocks for each tile container (if we have art-tiles)
    // if we don't have any art tiles, don't do anything yet
    if (artTileElements.length > 0) {
      processArtTiles();
    }
  }
});

resizeObserver.observe(document.body);
