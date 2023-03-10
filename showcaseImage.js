function showcaseImage(artTile) {
  console.log(artTile);
  // re-process all the tiles to put everything in the column it was in
  processArtTiles();

  // append this art tile to the top showcase tile (moving it from where it was in the grid)
  const showcaseTile = document.querySelector("showcase-tile");
  showcaseTile.querySelector("showcase-image").appendChild(artTile);

  const showcaseDescription = showcaseTile.querySelector(
    "showcase-description"
  );
  showcaseDescription.innerHTML = `
    <h2>${artTile.getAttribute("data-title")}</h2>
    <p>Example Description for Image</p>
  `;

  scrollTo({ top: 0, behavior: "smooth" });
}
