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
  const videoElement = aboutElement.querySelector("video-container video");
  videoElement.src = aboutVideoSrc;

  const aboutDescriptionContentHtml = documentToHtmlString(content);
  const aboutDescription = aboutElement.querySelector("about-description");
  aboutDescription.innerHTML = aboutDescriptionContentHtml;

  // make each link open in new tab
  aboutDescription.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
  });

  const aboutDescriptionClients = documentToHtmlString(clients);
  const clientsElement = aboutElement.querySelector("about-clients");
  clientsElement.innerHTML = aboutDescriptionClients;

  clientsElement.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
  });

  const aboutDescriptionPress = documentToHtmlString(press);
  const pressELement = aboutElement.querySelector("about-press");
  pressELement.innerHTML = aboutDescriptionPress;

  pressELement.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
  });
}

// about page has no footer, but if we add it back, uncomment this
// footer.innerText = `All Work © Daniel Jurman ${new Date().getFullYear()}`;
