/* snippet from contentful */
const client = contentful.createClient({
  space: 'xi70tbeq36e3',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM'
})

const artTileElements = [];
let columns = 0;
let largeColumn = null;

// pull the entry for the main page (you can find this in contentful, info panel)
const mainPageEntry = '2FDoqwaVPKZiumNtdH86Ad'
client.getEntry(mainPageEntry)
  .then((entry) => {
    // create all the art-tile elements and push them to `artTileElements`
    // by doing this first, when we append later, the elements will just move to where they need to go
    [...entry.fields.artTiles, ...entry.fields.artTiles, ...entry.fields.artTiles].forEach(generateArtTile)
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

// function to go through all the loaded art-tile elements (from contentful)
// and add then to the page
function processArtTiles() {
  artTileElements.forEach((artTileElement, index) => {
    const numberOfTiles = document.querySelectorAll('tile-container').length;
    document.querySelector(`tile-container[section="${index % numberOfTiles}"]`).appendChild(artTileElement);
  })
}

// function to generate a single art tile, and save it to our list of artTileElements
function generateArtTile(artTile) {
  const { title, media, publication } = artTile.fields;
  // create tile
  const artTileElement = document.createElement('art-tile');
  const mediaElement = generateMediaElement(media);
  artTileElement.innerHTML = `
		${mediaElement.outerHTML}
		<art-title>${title}</art-title>
		<art-publication>${publication}</art-publication>
	`

  // click action to make an image (and really, the entire column) larger
  artTileElement.onclick = (event) => {
    // determine what column we are in, and set that width to be wider
    let parentSection = parseInt(event.target.parentElement.parentElement.getAttribute('section'));
    const columnsContainer = document.querySelector('columns-container');
    const gridTemplate = columnsContainer.style.gridTemplateColumns.split(' ');
    // check if we were already wide (in which case, we should shrink)
    const alreadyWide = gridTemplate[parentSection] === '2.75fr'
    if (alreadyWide) {
      // set no section to be wide
      parentSection = -1;
    }
    const newGridTemplate = gridTemplate.map((_, index) => index === parentSection ? '2.75fr' : '1fr').join(' ');

    // scroll to the element that was clicked (if it's now out of view)
    let shouldScroll = true;
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
    function scroll() {
      event.target.scrollIntoView({ behavior: "auto", block: "center" });
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

  }
  artTileElements.push(artTileElement);
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

/* We are using a resize observer here to listen for changes in the window width.
 * If we see that we should add/remove columns, we blow away the old ones, and create new columns.
 * We do this (as opposed to more traditional methods) because of the staggered column layout
 */
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
