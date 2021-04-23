/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

//Define Global Variables

const nav = document.getElementById("navbar__list");
const sections = [...document.querySelectorAll("section")];
const header = document.querySelector(".page__header");
const scrollToTop = document.querySelector(".back-to-top");
const hero = document.querySelector(".main__hero");
const sectionExpand = [...document.querySelectorAll(".section-expand")];
let backgroundTimer;
let isScrolling;
const colors = [
  { startColor: "#e58c8a", endColor: "#eec0c6" },
  { startColor: "#d99ec9", endColor: "#f6f0c4" },
  { startColor: "#e5bdf6", endColor: "#d8dede" },
  { startColor: "#f5e3e6", endColor: "#d9e4f5" },
];

//End Global Variables

//Start Helper Functions

//Function to remove class name from elements
const removeActive = (elements, className) => {
  elements.forEach((element) => {
    if (element.classList.contains(className))
      element.classList.remove(className);
  });
};

//Function to add random background color to element passed in
const changeBackground = (section) => {
  const backgroundColor = colors[Math.floor(Math.random() * colors.length * 1)];
  const startColor = backgroundColor.startColor;
  const endColor = backgroundColor.endColor;
  section.style.backgroundImage = `linear-gradient(315deg, ${startColor} 0%, ${endColor} 74%)`;
};

//Function to remove background style from elements
const removeBackground = (elements) => {
  elements.forEach((element) => {
    element.style.background = "";
  });
};

//Function to get an element's position
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

//End Helper Functions

//Begin Main Functions

//Builds menu
const createNav = () => {
  sections.map((section) => {
    const li = document.createElement("li");
    const title = section.getAttribute("data-nav");
    li.insertAdjacentHTML(
      "afterbegin",
      `<a href="#" class="navLink">${title}</a>`
    );
    li.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView();
    });
    nav.appendChild(li);
  });
};
createNav();

//Adds class 'active' to links when section is active
const addActiveLink = (links) => {
  sections.forEach((section, index) => {
    if (section.classList.contains("active")) {
      links[index].classList.add("active");
    }
  });
};

//Removes class 'active' from sections and links
//Changes the background of the active section according to the set interval
const addActive = (entries) => {
  const navLinks = [...document.querySelectorAll(".navLink")];
  removeActive(sections, "active");
  removeActive(navLinks, "active");
  removeBackground(sections);
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      backgroundTimer = window.setInterval(
        () => changeBackground(entry.target),
        1500
      );
    } else {
      window.clearInterval(backgroundTimer);
    }
  });
  addActiveLink(navLinks);
};

//Add class 'active' to section when near top of viewport
const activeSection = () => {
  const options = {
    rootMargin: "0px",
    threshold: [1],
  };
  const io = new IntersectionObserver(addActive, options);
  sections.forEach((section) => io.observe(section));
};
activeSection();

//Shows return to top button if header is not in viewport
const activeScrollTop = () => {
  if (!isInViewport(hero)) {
    scrollToTop.classList.add("active");
  } else {
    scrollToTop.classList.remove("active");
  }
};

//Hides fixed navigation bar while not scrolling
const hideHeader = () => {
  if (header.classList.contains("hidden")) {
    header.classList.remove("hidden");
  }
  isScrolling = setTimeout(function () {
    if (window.scrollY > 0) {
      header.classList.add("hidden");
    }
  }, 3000);
};

const scrollEvent = () => {
  window.addEventListener("scroll", (event) => {
    activeScrollTop();
    window.clearTimeout(isScrolling);
    hideHeader();
  });
};
scrollEvent();

//When button is clicked scrolls to top of page
const scrollTop = () => {
  scrollToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};
scrollTop();

//This code makes sections collapse but it does not look good
/*
sectionExpand.forEach(function (section) {
  section.addEventListener("click", function () {
    this.classList.toggle("active");
    const sectionContent = this.nextElementSibling;
    if (sectionContent.style.maxHeight) {
      sectionContent.style.maxHeight = null;
    } else {
      sectionContent.style.maxHeight = sectionContent.scrollHeight + "px";
    }
    console.log(sectionContent);
  });
});
*/

//End Main Functions
