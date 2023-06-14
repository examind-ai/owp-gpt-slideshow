const API_URL = " http://localhost:4000/api/showcase";

window.addEventListener("load", function () {
  fetch(API_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response error");
      }

      return response.json();
    })
    .then(function (images) {
      const imagesList = document.createElement("ul");

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const imageListItem = document.createElement("li");
        const imageElement = document.createElement("img");
        imageElement.src = image.url;
        imageElement.alt = image.title;
        imageElement.title = image.title;
        imageElement.id = `wows1_${i}`;
        imageListItem.appendChild(imageElement);
        imagesList.appendChild(imageListItem);
      }

      const wowSlider = document.querySelector(".ws_images");
      wowSlider.appendChild(imagesList);

      jQuery("#wowslider-container1").wowSlider({
        effect: "basic",
        prev: "",
        next: "",
        duration: 20 * 100,
        delay: 70 * 100,
        width: 1024,
        height: 1024,
        autoPlay: true,
        autoPlayVideo: false,
        playPause: false,
        stopOnHover: false,
        loop: false,
        bullets: 0,
        caption: true,
        captionEffect: "fade",
        controls: false,
        controlsThumb: false,
        responsive: 1,
        fullScreen: false,
        gestures: 1,
        onBeforeStep: 0,
        images: 0,
      });
      
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
