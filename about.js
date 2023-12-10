// pull the entry for the about page (you can find this in contentful, info panel)
const aboutPageEntry = "2Mpw557fLAYflFcO16fLh9";
client
  .getEntry(aboutPageEntry)
  .then((entry) => {
    generateAboutBlock(entry);
  })
  .catch(console.error);

function generateAboutBlock(aboutEntry) {
  const aboutElement = document.querySelector("about-content");

  const { media, content, getInTouch, clients, press } = aboutEntry.fields;

  const aboutVideoSrc = media.fields.file.url;
  const videoElement = aboutElement.querySelector("video-container gif-video");
  videoElement.setAttribute("src", aboutVideoSrc);

  const aboutDescriptionContentHtml = documentToHtmlString(content);
  const aboutDescription = aboutElement.querySelector("about-description");
  aboutDescription.innerHTML = aboutDescriptionContentHtml;

  const aboutDescriptionGetInTouch = documentToHtmlString(getInTouch);
  const getInTouchElement = aboutElement.querySelector(
    "about-extras about-get-in-touch"
  );
  getInTouchElement.innerHTML = aboutDescriptionGetInTouch;

  const aboutDescriptionClients = documentToHtmlString(clients);
  const clientsElement = aboutElement.querySelector(
    "about-extras about-clients"
  );
  clientsElement.innerHTML = aboutDescriptionClients;

  const aboutDescriptionPress = documentToHtmlString(press);
  const pressELement = aboutElement.querySelector("about-extras about-press");
  pressELement.innerHTML = aboutDescriptionPress;
}
