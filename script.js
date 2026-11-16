const birthdayPhotos = [
  { file: "images/01-closeup.jpeg", alt: "A close-up portrait of LianaBriele", caption: "A sweet little moment" },
  { file: "images/02-adventure.jpeg", alt: "LianaBriele smiling in her cap and jacket", caption: "Ready for adventure" },
  { file: "images/03-cap-pose.jpeg", alt: "LianaBriele posing in her favorite cap", caption: "A little bit of sparkle" },
  { file: "images/04-park.jpeg", alt: "LianaBriele enjoying a green park", caption: "Out in the sunshine" },
  { file: "images/05-forest-pose.jpeg", alt: "LianaBriele striking a playful pose outdoors", caption: "Full of personality" },
  { file: "images/06-forest-smile.jpeg", alt: "LianaBriele smiling among the trees", caption: "A smile to remember" },
  { file: "images/07-forest-portrait.jpeg", alt: "LianaBriele smiling in the forest", caption: "Simply wonderful" },
  { file: "images/08-cap-portrait.jpeg", alt: "LianaBriele in her cap and football shirt", caption: "Always shining" },
];

const featuredImage = document.querySelector("#featured-image");
const photoCaption = document.querySelector("#photo-caption");
const photoCount = document.querySelector("#photo-count");
const photoGallery = document.querySelector("#photo-gallery");
const carouselDots = document.querySelector("#carousel-dots");
const wishButton = document.querySelector("#wish-button");
const wishButtonLabel = document.querySelector("#wish-button-label");
const birthdayWish = document.querySelector("#birthday-wish");
const musicButton = document.querySelector("#music-button");
const musicLabel = document.querySelector("#music-label");
const musicPlayer = document.querySelector("#music-player");

let selectedPhoto = 6;

function selectPhoto(index) {
  selectedPhoto = (index + birthdayPhotos.length) % birthdayPhotos.length;
  const photo = birthdayPhotos[selectedPhoto];
  featuredImage.src = photo.file;
  featuredImage.alt = photo.alt;
  photoCaption.textContent = photo.caption;
  photoCount.textContent = `${String(selectedPhoto + 1).padStart(2, "0")} / ${String(birthdayPhotos.length).padStart(2, "0")}`;

  photoGallery.querySelectorAll(".birthday-photo-tile").forEach((tile, tileIndex) => {
    const active = tileIndex === selectedPhoto;
    tile.classList.toggle("is-featured", active);
    tile.setAttribute("aria-pressed", String(active));
  });
  carouselDots.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
    const active = dotIndex === selectedPhoto;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-current", active ? "true" : "false");
  });
}

birthdayPhotos.forEach((photo, index) => {
  const thumbnail = document.createElement("button");
  thumbnail.className = `birthday-photo-tile${index === selectedPhoto ? " is-featured" : ""}`;
  thumbnail.type = "button";
  thumbnail.setAttribute("aria-label", `Show photo ${index + 1}: ${photo.caption}`);
  thumbnail.setAttribute("aria-pressed", String(index === selectedPhoto));

  const image = document.createElement("img");
  image.src = photo.file;
  image.alt = photo.alt;
  image.loading = "lazy";
  thumbnail.append(image);
  thumbnail.addEventListener("click", () => selectPhoto(index));
  photoGallery.append(thumbnail);

  const dot = document.createElement("button");
  dot.className = `carousel-dot${index === selectedPhoto ? " is-active" : ""}`;
  dot.type = "button";
  dot.setAttribute("aria-label", `Show ${photo.caption}`);
  dot.setAttribute("aria-current", String(index === selectedPhoto));
  dot.addEventListener("click", () => selectPhoto(index));
  carouselDots.append(dot);
});

document.querySelector("#previous-photo").addEventListener("click", () => selectPhoto(selectedPhoto - 1));
document.querySelector("#next-photo").addEventListener("click", () => selectPhoto(selectedPhoto + 1));

wishButton.addEventListener("click", () => {
  const isExpanded = wishButton.getAttribute("aria-expanded") === "true";
  wishButton.setAttribute("aria-expanded", String(!isExpanded));
  birthdayWish.hidden = isExpanded;
  wishButtonLabel.textContent = isExpanded ? "Open your birthday wish" : "Close your birthday wish";
});

musicButton.addEventListener("click", () => {
  const isExpanded = musicButton.getAttribute("aria-expanded") === "true";
  musicButton.setAttribute("aria-expanded", String(!isExpanded));
  musicPlayer.hidden = isExpanded;

  if (isExpanded) {
    musicPlayer.src = "about:blank";
    musicLabel.textContent = "Play birthday song";
  } else {
    musicPlayer.src = "https://www.youtube-nocookie.com/embed/IIsiWiAAxUM?autoplay=1&rel=0";
    musicLabel.textContent = "Close birthday song";
  }
});
