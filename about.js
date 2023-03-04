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
    console.log(entry);
    generateAboutBlock(entry);
  })
  .catch(console.error)

function generateAboutBlock(aboutEntry) {
  const aboutElement = document.createElement('about-content')
  const aboutVideoSrc = entry.fileds.media.fields.file.url;
  const aboutDescriptionHtml = documentToHtmlString(entry.fields.content.content);
  // processArtTiles()
  document.querySelector('about-block').appendChild(aboutElement)
}