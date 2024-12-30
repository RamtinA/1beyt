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
startupTimeline.from(".ganjoor-m1", { x: 100, duration: 1, opacity: 0 });
startupTimeline.from(".ganjoor-m2", { x: -100, duration: 1, opacity: 0 }, "<0");
startupTimeline.from(".ganjoor-poet", { opacity: 0 }, ">0.5");
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
  hidePoems();
  const scriptTag = document.getElementById('ganjoor-script');
const value="newvalue";
    if (scriptTag) {
        const newScript = document.createElement('script');
        [...scriptTag.attributes].forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        newScript.src = "https://c.ganjoor.net/beyt.php?block=ganjoor-block&p=" + poetSelectorEl.value;
        // Remove the old script and append the new one
        const parent = scriptTag.parentNode;
        parent.removeChild(scriptTag);
        parent.appendChild(newScript);
    }
  // setTimeout(()=>{window.location.reload()}, 500)
};
logoEl.addEventListener("mouseenter", onLogoHover);
logoEl.addEventListener("mouseout", onLogoLeave);
logoEl.addEventListener("click", onLogoClick);
// EventHandlers ---- End

const revealPoems = () => {
  gsap.to(".ganjoor-m1", { opacity: 1 });
  gsap.to(".ganjoor-m2", { opacity: 1 });
  gsap.to(".ganjoor-poet", { opacity: 1 });
};
const hidePoems = () => {
  gsap.to(".ganjoor-m1", { opacity: 0 });
  gsap.to(".ganjoor-m2", { opacity: 0 });
  gsap.to(".ganjoor-poet", { opacity: 0 });
};
const setPoem = () => {
  m1.innerHTML = poem.m1;
  m2.innerHTML = poem.m2;
  poet.innerHTML = poem.poet;
  poet.setAttribute("href", poem.url)
};


setTimeout(onLogoHover, 10000)