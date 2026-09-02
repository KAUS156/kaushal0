
/* =========================================================
   KAUSHAL KUMAR WEBSITE
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  initMobileMenu();

  initCurrentYear();

  initActiveNavigation();

  initSmoothScroll();

  initExternalLinks();

});


/* =========================================================
   2. MOBILE MENU
========================================================= */

function initMobileMenu() {

  const menuButton =
    document.getElementById("menuButton");

  const navLinks =
    document.getElementById("navLinks");


  if (!menuButton || !navLinks) {
    return;
  }


  menuButton.addEventListener(
    "click",
    function () {

      const isOpen =
        navLinks.classList.toggle("active");


      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );


      menuButton.textContent =
        isOpen ? "✕" : "☰";

    }
  );


  /* Close menu after clicking a link */

  const links =
    navLinks.querySelectorAll("a");


  links.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        menuButton.textContent = "☰";

      }
    );

  });


  /* Close menu with Escape */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        navLinks.classList.contains("active")
      ) {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        menuButton.textContent = "☰";

        menuButton.focus();

      }

    }
  );


  /* Close menu when clicking outside */

  document.addEventListener(
    "click",
    function (event) {

      const clickedInsideMenu =
        navLinks.contains(event.target);

      const clickedButton =
        menuButton.contains(event.target);


      if (
        !clickedInsideMenu &&
        !clickedButton &&
        navLinks.classList.contains("active")
      ) {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent = "☰";

      }

    }
  );

}


/* =========================================================
   3. CURRENT YEAR
========================================================= */

function initCurrentYear() {

  const yearElements =
    document.querySelectorAll("#year");


  if (!yearElements.length) {
    return;
  }


  const currentYear =
    new Date().getFullYear();


  yearElements.forEach(function (element) {

    element.textContent =
      currentYear;

  });

}


/* =========================================================
   4. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

  const navLinks =
    document.querySelectorAll(".nav-links a");


  if (!navLinks.length) {
    return;
  }


  let currentPage =
    window.location.pathname
      .split("/")
      .pop();


  /* Homepage */

  if (
    currentPage === "" ||
    currentPage === "index.html"
  ) {

    currentPage =
      "index.html";

  }


  navLinks.forEach(function (link) {

    const href =
      link.getAttribute("href");


    if (!href) {
      return;
    }


    const cleanHref =
      href.split("#")[0];


    if (
      cleanHref === currentPage
    ) {

      link.classList.add("active");

      link.setAttribute(
        "aria-current",
        "page"
      );

    }

  });

}


/* =========================================================
   5. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        /* Accessibility */

        target.setAttribute(
          "tabindex",
          "-1"
        );

        target.focus({
          preventScroll: true
        });

      }
    );

  });

}


/* =========================================================
   6. EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

  const currentHost =
    window.location.hostname;


  const links =
    document.querySelectorAll("a[href]");


  links.forEach(function (link) {

    const href =
      link.getAttribute("href");


    if (!href) {
      return;
    }


    if (
      href.startsWith("http://") ||
      href.startsWith("https://")
    ) {

      try {

        const url =
          new URL(href);


        if (
          url.hostname !== currentHost
        ) {

          link.setAttribute(
            "target",
            "_blank"
          );


          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }

      } catch (error) {

        console.warn(
          "Invalid URL:",
          href
        );

      }

    }

  });

}


/* =========================================================
   7. BACK TO TOP
========================================================= */

function createBackToTopButton() {

  const button =
    document.createElement("button");


  button.type = "button";

  button.id = "backToTop";

  button.className = "back-to-top";

  button.setAttribute(
    "aria-label",
    "Back to top"
  );

  button.innerHTML = "↑";


  document.body.appendChild(button);


  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 500) {

        button.classList.add("show");

      } else {

        button.classList.remove("show");

      }

    },
    { passive: true }
  );


  button.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   8. FAQ ACCORDION
========================================================= */

function initFAQ() {

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(function (item) {

    const question =
      item.querySelector(
        ".faq-question"
      );


    const answer =
      item.querySelector(
        ".faq-answer"
      );


    if (
      !question ||
      !answer
    ) {
      return;
    }


    question.addEventListener(
      "click",
      function () {

        const isOpen =
          item.classList.toggle("open");


        question.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        if (isOpen) {

          answer.style.maxHeight =
            answer.scrollHeight + "px";

        } else {

          answer.style.maxHeight =
            "0px";

        }

      }
    );

  });

}


/* =========================================================
   9. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".card, .project-card, .timeline-item"
    );


  if (!elements.length) {
    return;
  }


  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }


  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    function (element) {

      element.classList.add(
        "reveal"
      );

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   10. IMAGE ERROR HANDLING
========================================================= */

function initImageFallback() {

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(function (image) {

    image.addEventListener(
      "error",
      function () {

        image.style.display =
          "none";

      }
    );

  });

}


/* =========================================================
   11. PERFORMANCE
========================================================= */

function initPerformance() {

  const lazyImages =
    document.querySelectorAll(
      "img[data-src]"
    );


  lazyImages.forEach(
    function (image) {

      image.setAttribute(
        "loading",
        "lazy"
      );


      const source =
        image.getAttribute(
          "data-src"
        );


      if (source) {

        image.src = source;

      }

    }
  );

}


/* =========================================================
   12. INITIALIZE OPTIONAL FEATURES
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    createBackToTopButton();

    initFAQ();

    initScrollReveal();

    initImageFallback();

    initPerformance();

  }
);
