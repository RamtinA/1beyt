// Elements
const logoEl = document.getElementById("logo");
const headerBeforeEl = document.querySelector(".logo-before");
const headerTextEl = document.querySelector(".logo-text");
const headerAfterEl = document.querySelector(".logo-after");
const m1El = document.getElementById("m1");
const m1E2 = document.getElementById("m2");
const poetEl = document.getElementById("poet");
const poetSelectorEl = document.getElementById("poet_selector");

let poem = {};
let titlePrefix = "یک بیت";
let gettingNewPoem = false;
// Start ---- set GSAP timelines
let startupTimeline = gsap.timeline();

startupTimeline.from("header", {
  duration: 1,
  opacity: 0,
  delay: 0.5,
  ease: "slow",
});
startupTimeline.from(".sidebar", { opacity: 0, duration: 1 });
startupTimeline.from("header", { duration: 2, y: 300, ease: "slow" });
startupTimeline.from("#m1", { x: 100, duration: 1, opacity: 0 });
startupTimeline.from("#m2", { x: -100, duration: 1, opacity: 0 }, "<0");
startupTimeline.from("#poet", { opacity: 0 }, ">0.5");
startupTimeline.from("footer", { opacity: 0, delay: 1, duration: 1 });

// End ---- GSAP timelines

// EventHandlers ---- Start

const onLogoHover = (event) => {
  headerBeforeEl.classList.add("logo-hover");
  headerTextEl.classList.add("logo-text-hover");
  headerAfterEl.classList.add("logo-hover");
};
const onLogoLeave = (event) => {
  headerBeforeEl.classList.remove("logo-hover");
  headerTextEl.classList.remove("logo-text-hover");
  headerAfterEl.classList.remove("logo-hover");
};
const onLogoClick = (event) => {
  event.preventDefault();
  if (!gettingNewPoem) {
    gettingNewPoem = true;
    hidePoems();
    setTimeout(getPoem, 500);
    setTimeout(revealPoems, 1000);
  }
};
logoEl.addEventListener("mouseenter", onLogoHover);
logoEl.addEventListener("mouseout", onLogoLeave);
logoEl.addEventListener("click", onLogoClick);
// EventHandlers ---- End

const revealPoems = () => {
  gsap.to("#m1", { opacity: 1 });
  gsap.to("#m2", { opacity: 1 });
  gsap.to("#poet", { opacity: 1 });
  gettingNewPoem = false;
};
const hidePoems = () => {
  gsap.to("#m1", { opacity: 0 });
  gsap.to("#m2", { opacity: 0 });
  gsap.to("#poet", { opacity: 0 });
};
const setPoem = () => {
  m1.innerHTML = poem.m1;
  m2.innerHTML = poem.m2;
  poet.innerHTML = poem.poet;
  poet.setAttribute("href", poem.url)
};


const getPoem = async () => {

  const url = `http://c.ganjoor.net/beyt-xml.php?n=1${poetSelectorEl.value > 0 ? `&p=${poetSelectorEl.value}` : ''}`;
  // Make a request for a user with a given ID
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(xmlText => {
      const parser = new DOMParser();
      const xmlResult = parser.parseFromString(xmlText,
        'text/xml');
      poem = {
        m1: xmlResult.getElementsByTagName('m1')
        [0].textContent,
        m2: xmlResult.getElementsByTagName('m2')
        [0].textContent,
        poet: xmlResult.getElementsByTagName('poet')
        [0].textContent,
        url: xmlResult.getElementsByTagName('url')
        [0].textContent,
      };
      document.title = "یک بیت شعر از " + poem.poet;
      setPoem();
    })
    .catch(error => {
      console.error(`There was a problem with
                       the fetch operation:`, error);
    });

};

getPoem();

setTimeout(onLogoHover, 10000)