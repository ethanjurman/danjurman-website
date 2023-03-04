/* snippet from contentful */
const client = contentful.createClient({
  space: 'xi70tbeq36e3',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM'
})

// pull the entry for the main page (you can find this in contentful, info panel)
const mainPageEntry = '2FDoqwaVPKZiumNtdH86Ad'
client.getEntry(mainPageEntry)
  .then((entry) => {
    console.log(entry);
    entry.fields.artTiles.forEach(generateArtTile)
  })
  .catch(console.error)

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

function generateArtTile(artTile) {
  console.log('Generating art tile');
  const { title, media, publication } = artTile.fields;
  console.log({ title, media, publication });
  // create tile
  const artTileElement = document.createElement('art-tile');
  const mediaElement = generateMediaElement(media);
  artTileElement.innerHTML = `
		${mediaElement.outerHTML}
		<div class="art-title">${title}</div>
		<div class="art-publication">${publication}</div>	
	`

  document.querySelector('tile-container').appendChild(artTileElement)
}