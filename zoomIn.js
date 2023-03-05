function zoomIn(target) {
  if (target.parentElement.tagName !== "ART-TILE") {
    return false;
  }

  // reset all styles
  document.querySelectorAll("tile-column").forEach((tileElement) => {
    tileElement.style.flexDirection = "column";
  })
  document.querySelectorAll("art-tile").forEach((childElement) => {
    childElement.style.width = "100%";
    childElement.style.boxShadow = "0px 0px 0px black";
    childElement.style.zIndex = "0";
  });

  target = target.parentElement.firstElementChild; // ensures that we are selecting the media element, and not the text

  const hash = window.location.hash.split("#")[1];
  const newHash = target.parentElement.textContent.replace(/\W/g, "");

  // determine what column we are in, and set that width to be wider
  let parentSection = parseInt(
    target.parentElement.parentElement.getAttribute("section")
  );

  // if we've selected the same image, we should shrink
  if (hash === newHash) {
    parentSection = -1;
  }

  const columnsContainer = document.querySelector("columns-container");
  const oldGridTemplate = columnsContainer.style.gridTemplateColumns;
  const newGridTemplate = oldGridTemplate
    .split(" ")
    .map((oldValue, index) => {
      if (oldValue === "0fr") {
        return "0fr";
      }
      return index === parentSection ? "2.75fr" : "1fr";
    })
    .join(" ");

  // make surrounding elements small
  if (parentSection >= 0) {
    document.querySelectorAll("tile-column")[
      parentSection
    ].style.flexDirection = "row";

    [...target.parentElement.parentElement.children].forEach((child) => {
      if (child.tagName !== "ART-TILE") {
        return;
      }
      if (child === target.parentElement) {
        child.style.width = "100%";
        child.style.boxShadow = "0px 0px 1000px black, 0px 0px 1000px black";
        child.style.zIndex = "1";
      } else {
        child.style.width = "calc(50% - 20px)";
      }
    });
  }

  // scroll to the element that was clicked (if it's now out of view)
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // if grid template has changed, should attempt to scroll to the element after sizing
  if (oldGridTemplate !== newGridTemplate) {
    let shouldScroll = true;

    function scroll() {
      target.scrollIntoView({ behavior: "auto", block: "center" });
      if (shouldScroll) {
        window.requestAnimationFrame(scroll);
      }
    }

    // wait until auto smooth scroll if finished, then scroll with zoomed element
    setTimeout(() => {
      columnsContainer.style.gridTemplateColumns = newGridTemplate;
      window.requestAnimationFrame(scroll);
    }, 200);
    setTimeout(() => {
      shouldScroll = false;
    }, 1000);
  }

  // set hash
  if (parentSection !== -1) {
    window.location.hash = target.parentElement.textContent.replace(/\W/g, "");
  }
  if (parentSection === -1) {
    resetHash();
  }
}
