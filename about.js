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
  })
  .catch(console.error)

function generateAboutBlock(aboutEntry) {
  const aboutElement = document.createElement('about-content')
  const aboutVideoSrc = aboutEntry.fields.media.fields.file.url;
  const aboutDescriptionHtml = documentToHtmlString(aboutEntry.fields.content);

  aboutElement.innerHTML = `
    <video src=${aboutVideoSrc} playsinline='' autoplay='' loop='' muted=''></video>
    ${aboutDescriptionHtml}
  `
  document.querySelector('about-block').appendChild(aboutElement)
}
