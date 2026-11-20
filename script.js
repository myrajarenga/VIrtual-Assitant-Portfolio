const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const introVideo = document.querySelector("#intro-video");
const videoCover = document.querySelector(".video-cover");
const videoError = document.querySelector(".video-error");

if (introVideo instanceof HTMLVideoElement && videoCover instanceof HTMLButtonElement && videoError instanceof HTMLElement) {
  videoCover.addEventListener("click", () => {
    videoError.textContent = "";
    introVideo.play().catch((error) => {
      videoError.textContent = "The video could not start. Please try again.";
      console.error("Unable to play the introduction video.", error);
    });
  });

  introVideo.addEventListener("play", () => {
    videoCover.hidden = true;
  });

  introVideo.addEventListener("ended", () => {
    introVideo.currentTime = 0;
    videoCover.hidden = false;
  });

  introVideo.addEventListener("error", () => {
    videoError.textContent = "The video could not load. Please refresh the page and try again.";
    console.error("Unable to load the introduction video.", introVideo.error);
  });
}
