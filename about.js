/* snippet from contentful */
const client = contentful.createClient({
  space: 'xi70tbeq36e3',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM'
})

// pull the entry for the about page (you can find this in contentful, info panel)
const aboutPageEntry = '2Mpw557fLAYflFcO16fLh9'
client.getEntry(aboutPageEntry)
  .then((entry) => {
    generateAboutBlock(entry);
    setTimeout(adjustOverlay, 250);
  })
  .catch(console.error)

function generateAboutBlock(aboutEntry) {
  const aboutElement = document.createElement('about-content')
  const aboutVideoSrc = aboutEntry.fields.media.fields.file.url;
  const aboutDescriptionHtml = documentToHtmlString(aboutEntry.fields.content);

  aboutElement.innerHTML = `
    <video-container>
      <video src=${aboutVideoSrc} id="about-video" playsinline='' autoplay='' loop='' muted=''></video>
    </video-container>
    <about-description>${aboutDescriptionHtml}</about-description>
  `
  document.querySelector('about-block').appendChild(aboutElement)
}

function adjustOverlay() {
  const descriptionElement = document.querySelector('about-description');
  const videoElement = document.querySelector('video');
  const customCssVariablesElement = document.querySelector('custom-css-variables');

  const descriptionHeight = descriptionElement.clientHeight
  const videoHeight = videoElement.clientHeight;

  if (descriptionHeight > videoHeight) {
    // description content can NOT be inside video element
    descriptionElement.style.position = 'relative';
    descriptionElement.style.background = 'none';
    customCssVariablesElement.style.setProperty('--video-overlay', 'none');
  } else if (descriptionHeight <= videoHeight) {
    // description content can be inside video element
    descriptionElement.style.position = 'absolute';
    customCssVariablesElement.style.setProperty('--video-overlay', '#ffffff4d');
  }
}

addEventListener("resize", adjustOverlay);