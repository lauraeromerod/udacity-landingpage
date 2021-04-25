//Define Global Variables
let backgroundTimer;
let isScrolling;
const nav = document.getElementById("navbar__list");
const header = document.querySelector(".page__header");
const scrollToTop = document.querySelector(".back-to-top");
const hero = document.querySelector(".main__hero");
const sections = [...document.querySelectorAll("section")];
const sectionExpand = [...document.querySelectorAll(".section-expand")];
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
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
};

//Function to remove class name according to the viewport
const removeActiveSection = (elements, className) => {
  elements.forEach((element) => {
    if (element.classList.contains(className) && !isInViewport(element)) {
      element.classList.remove(className);
    }
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
const removeBackground = (elements, className) => {
  elements.forEach((element) => {
    if (!element.classList.contains(className)) {
      window.clearInterval(backgroundTimer);
      element.style.background = "";
    }
  });
};

//Function to get an element's top position
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < 250 && rect.top >= -200;
};
//End Helper Functions

//Begin Main Functions
//Builds menu
const createNav = () => {
  sections.map((section) => {
    const li = document.createElement("li");
    const title = section.getAttribute("data-nav");
    li.insertAdjacentHTML("afterbegin", `<a class="navLink">${title}</a>`);
    li.addEventListener("click", (e) => {
      e.preventDefault();
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    });
    nav.appendChild(li);
  });
};
createNav();

//Adds class 'active' to navigation links when section is active
//Removes class 'active' from sections and links
//Changes the background of the active section according to the set interval
//Add class 'active' to section when near top of viewport
const activeSection = () => {
  const navLinks = [...document.querySelectorAll(".navLink")];
  removeActiveSection(sections, "active");
  removeActive(navLinks, "active");
  removeBackground(sections, "active");
  sections.forEach((section, index) => {
    if (isInViewport(section)) {
      navLinks[index].classList.add("active");
      section.classList.add("active");
      backgroundTimer = window.setInterval(
        () => changeBackground(section),
        1500
      );
    }
  });
};

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
  isScrolling = setTimeout(() => {
    if (window.scrollY > 0) {
      header.classList.add("hidden");
    }
  }, 3000);
};

const scrollEvent = () => {
  window.addEventListener("scroll", (event) => {
    activeScrollTop();
    activeSection();
    window.clearTimeout(isScrolling);
    hideHeader();
  });
};
scrollEvent();

//When button is clicked scrolls to top of page
const scrollTop = () => {
  scrollToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
};
scrollTop();
//End Main Functions
