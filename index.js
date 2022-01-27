window.onload = () => {
  //   let places = staticLoadPlaces();
  //   renderPlaces(places);
  let myLocation = {
    latitude: 2.7334644166285447,
    longitude: 101.89416862699005,
    altitude: 0,
  };

  navigator.geolocation.getCurrentPosition((position) => {
    const latText = document.querySelector("#lat");
    const lonText = document.querySelector("#lon");
    const altText = document.querySelector("#alt");

    const { coords } = position;
    myLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
    };

    latText.innerHTML = `Latitude: ${coords.latitude}`;
    latText.innerHTML = `Longitude: ${coords.longitude}`;
    latText.innerHTML = `Altitude: ${coords.altitude}`;
  });

  const entity = document.querySelector("a-entity");
  const distText = document.querySelector("#dist");

  entity.flushToDOM();
  console.log("[DEBUG] :: ", { entity });
  const distanceMsg = entity.getAttribute("distanceMsg");
  distText.innerHTML = `Distance: ${distanceMsg}meters`;
  AFRAME.registerComponent("model", {
    init: function () {
      this.el.addEventListener("click", (evt) => {
        console.log("[DEBUG] :: ", { evt });
        alert(`[DEBUG] ${evt.target.id}`);
      });
    },
  });
};

function staticLoadPlaces() {
  return [
    {
      id: "ad-001",
      attribute: {
        locationName: "Ainsdale Corner 1",
        latitude: 2.733597,
        longitude: 101.894016,
        position: "0 30 0",
        scale: "1 1 1",
        color: "red",
      },
      reward: {
        points: 1,
        item: "UC",
      },
    },
    {
      id: "ad-002",
      attribute: {
        locationName: "Ainsdale Fence Corner 2",
        latitude: 2.733615,
        longitude: 101.894279,
        position: "-10 88 0",
        scale: "1 1 1",
        color: "blue",
      },
      reward: {
        points: 1,
        item: "UC",
      },
    },
    {
      id: "ad-003",
      attribute: {
        locationName: "inside my house",
        latitude: 2.7334544,
        longitude: 101.8941537,
        position: "20 100 -20",
        scale: "1 1 1",
        color: "green",
      },
      reward: {
        points: 1,
        item: "UC",
      },
    },
    {
      id: "ad-004",
      attribute: {
        locationName: "my location",
        latitude: 2.7334647,
        longitude: 101.8942552,
        position: "10 90 10",
        scale: "0.5 0.5 0.5",
        color: "yellow",
      },
      reward: {
        points: 1,
        item: "UC",
      },
    },
  ];
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    const { latitude, longitude, rotation } = place.attribute;

    let model = document.createElement("a-entity");
    model.setAttribute("id", place.id);
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("gltf-model", "./assets/magnemite/scene.gltf");
    model.setAttribute("rotation", rotation);
    model.setAttribute("animation-mixer", "");
    model.setAttribute("scale", "0.5 0.5 0.5");

    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    model.addEventListener("click", (event) => {
      console.log("[DEBUG] :: ", { event });
      alert(`[DEBUG] :: ${event.target.id}`);
    });

    scene.appendChild(model);
  });
}
