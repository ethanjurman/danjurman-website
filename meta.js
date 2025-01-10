/* snippet from contentful */
const client = contentful.createClient({
  space: "xi70tbeq36e3",
  environment: "master", // defaults to 'master' if not set
  accessToken: "if9Vw15EoyMc4a-Js1-gztNYSIwTnPnEsE7OQaZEJoM",
});

const metaEntry = "4OTARlwFPXmvE9KfxjmPwb";
client
  .getEntry(metaEntry)
  .then((entry) => {
    // set the description of the page based on contentful data
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription.setAttribute("content", entry.fields.searchResultSnippet);

    window.posterSrc = entry.fields.videoPlaceholder?.fields?.file?.url;
  })
  .catch(console.error);
