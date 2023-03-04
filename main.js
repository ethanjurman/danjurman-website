/* snippet from contentful */
const client = contentful.createClient({
  space: 'xi70tbeq36e3',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM'
})

const artTiles = [];
let columns = 0;

// pull the entry for the main page (you can find this in contentful, info panel)
const mainPageEntry = '2FDoqwaVPKZiumNtdH86Ad'
client.getEntry(mainPageEntry)
  .then((entry) => {
    artTiles.push(...entry.fields.artTiles, ...entry.fields.artTiles, ...entry.fields.artTiles);
    processArtTiles()
  })
  .catch(console.error)

// function to generate a video or image block, used for art-tiles
function generateMediaElement(media) {
  if (!media?.fields?.file) {
    console.warn('no file associated with media!', media)
    return null;
  }
  const { contentType, url } = media.fields.file
  if (contentType.match('image')) {
    const mediaElement = document.createElement('img');
    mediaElement.src = url;
    return mediaElement
  }
  if (contentType.match('video')) {
    const mediaElement = document.createElement('video');
    mediaElement.src = url;
    mediaElement.controls = false;
    mediaElement.autoplay = true;
    mediaElement.playsInline = true;
    mediaElement.loop = true;
    mediaElement.setAttribute('muted', '');

    return mediaElement
  }

  // if we couldn't match with some filetype, warn here!
  console.warn(`unknown filetype!`, contentType)
}

// function to go through all the loaded art-tile objects (from contentful)
// and add then to the page
function processArtTiles() {
  artTiles.forEach(generateArtTile)
}

// function to generate a single art tile, and add it to the page
function generateArtTile(artTile, index) {
  const { title, media, publication } = artTile.fields;
  // create tile
  const artTileElement = document.createElement('art-tile');
  const mediaElement = generateMediaElement(media);
  artTileElement.innerHTML = `
		${mediaElement.outerHTML}
		<div class="art-title">${title}</div>
		<div class="art-publication">${publication}</div>	
	`
  const numberOfTiles = document.querySelectorAll('tile-container').length;
  document.querySelector(`tile-container[section="${index % numberOfTiles}"]`).appendChild(artTileElement);
}

// function to recreate the tile containers based on the width of the page
function createTileContainers(numberOfTiles) {
  // clean up previous tile containers
  const parentContainer = document.querySelector('columns-container');
  parentContainer.innerHTML = ''
  parentContainer.style.gridTemplateColumns = '1fr '.repeat(numberOfTiles)

  // create new tile containers
  for (let i = 0; i < numberOfTiles; i++) {
    const tileElement = document.createElement('tile-container');
    tileElement.setAttribute('section', i);
    parentContainer.appendChild(tileElement)
  }
}

const resizeObserver = new ResizeObserver((entries) => {
  // determine how many tile containers we should make
  const newNumberOfColumns = Math.min(Math.ceil(window.innerWidth / 600), 4);
  if (columns !== newNumberOfColumns) {
    // make tile containers
    createTileContainers(newNumberOfColumns)
    // re-generate art blocks for each tile container
    processArtTiles()
    columns = newNumberOfColumns;
  }
})

resizeObserver.observe(document.body);