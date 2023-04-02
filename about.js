/* snippet from contentful */
const client = contentful.createClient({
  space: "xi70tbeq36e3",
  environment: "master", // defaults to 'master' if not set
  accessToken: "if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM",
});

// pull the entry for the about page (you can find this in contentful, info panel)
const aboutPageEntry = "2Mpw557fLAYflFcO16fLh9";
client
  .getEntry(aboutPageEntry)
  .then((entry) => {
    generateAboutBlock(entry);
  })
  .catch(console.error);

function generateAboutBlock(aboutEntry) {
  const aboutElement = document.createElement("about-content");
  const { media, content, getInTouch, clients, press } = aboutEntry.fields;

  const aboutVideoSrc = media.fields.file.url;
  const aboutDescriptionContentHtml = documentToHtmlString(content);
  const aboutDescriptionGetInTouch = documentToHtmlString(getInTouch);
  const aboutDescriptionClients = documentToHtmlString(clients);
  const aboutDescriptionPress = documentToHtmlString(press);

  aboutElement.innerHTML = `
    <video-container>
      <video src=${aboutVideoSrc} id="about-video" playsinline='' autoplay='' loop='' muted=''></video>
    </video-container>
    <about-description>
      ${aboutDescriptionContentHtml}
    </about-description>
    <about-extras>
      <about-get-in-touch>${aboutDescriptionGetInTouch}</about-get-in-touch>
      <about-clients>${aboutDescriptionClients}</about-clients>
      <about-press>${aboutDescriptionPress}</about-press>
    </about-extras>
    <back-button>
      <a href="/">
        <img src="./back-pointing.svg" alt="back" />
      </a>
    </back-button>
  `;
  document.querySelector("about-block").appendChild(aboutElement);
}
