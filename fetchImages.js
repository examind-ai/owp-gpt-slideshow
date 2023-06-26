const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

function fetchImagesInit(url) {
  const startSlideshow = images => {
    const imagesList = document.createElement('ul');

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const imageListItem = document.createElement('li');
      const imageElement = document.createElement('img');
      imageElement.src = image.url;
      imageElement.alt = image.title;
      imageElement.title = image.title;
      imageElement.id = `wows1_${i}`;
      imageListItem.appendChild(imageElement);
      imagesList.appendChild(imageListItem);
    }

    const wowSlider = document.querySelector('.ws_images');
    wowSlider.appendChild(imagesList);

    jQuery('#wowslider-container1').wowSlider({
      effect: 'basic',
      prev: '',
      next: '',
      duration: 20 * 100,
      delay: 80 * 100,
      width: 1280,
      height: 720,
      autoPlay: true,
      autoPlayVideo: false,
      playPause: false,
      stopOnHover: false,
      loop: false,
      bullets: 0,
      caption: true,
      captionEffect: 'fade',
      controls: false,
      controlsThumb: false,
      responsive: 1,
      fullScreen: false,
      gestures: 1,
      onBeforeStep: 0,
      images: 0,
    });
  };

  const getDeviceId = () => {
    if (localStorage.getItem('deviceId')) {
      return localStorage.getItem('deviceId');
    } else {
      var randomString = Math.random().toString(36).substring(2, 8);
      localStorage.setItem('deviceId', randomString);
      return randomString;
    }
  };

  const exhibitUrl = `${url.replace(
    'showcase',
    'exhibits',
  )}/${getDeviceId()}`;

  (async () => {
    const fetchImages = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          await sleep(1000);
          await fetchImages();
          return;
        }

        const images = await response.json();
        if (images.length) startSlideshow(images);
      } catch {
        await sleep(1000);
        await fetchImages();
      }

      await fetch(`${exhibitUrl}/reloaded`);
    };

    await fetchImages();

    const ping = async () => {
      try {
        const response = await fetch(exhibitUrl);
        if (!response.ok) {
          await sleep(5000);
          await ping();
          return;
        }

        const body = await response.json();
        if (body.shouldReload) {
          window.location.reload();
        } else {
          await sleep(60 * 1000);
          await ping();
        }
      } catch {
        await sleep(5000);
        await ping();
      }
    };

    await sleep(60 * 1000);
    await ping();
  })();
}
