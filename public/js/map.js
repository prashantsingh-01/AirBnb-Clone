mapboxgl.accessToken = mapToken;

document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error("Map container element not found");
    return;
  }

  if (
    !Array.isArray(listing.geometry.coordinates) ||
    listing.geometry.coordinates.length !== 2
  ) {
    console.error("Coordinates are invalid:", listing.geometry.coordinates);
    return;
  }

  const map = new mapboxgl.Map({
    container: "map", // Ensure this matches the ID of the HTML element
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom: 9,
  });

  // Add navigation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", () => {
    console.log("Map loaded successfully");

    // Add marker after the map has loaded
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${listing.location}</h4><p>Exact Location Provided after booking</p>`
        )
      )
      .addTo(map);
  });

  map.on("error", (e) => {
    console.error("Error loading map:", e);
  });
});
