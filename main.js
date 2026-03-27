document.addEventListener("DOMContentLoaded", () => {
  // Function to load external HTML into an element
  const loadComponent = async (url, elementId) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
      } else {
        console.error(`Failed to load ${url}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
    }
  };

  // Load header and footer
  loadComponent("./components/header.html", "header-placeholder");
  loadComponent("./components/footer.html", "footer-placeholder");

  // Initialize Swiper
  const swiper = new Swiper(".hero-swiper", {
    loop: true,
    speed: 1200,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init: function () {
        animateSlideContent(this);
      },
      slideChangeTransitionStart: function () {
        animateSlideContent(this);
      },
    },
  });

  function animateSlideContent(swiperInstance) {
    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    const elementsToAnimate = activeSlide.querySelectorAll(
      "h1, p, .btn, .sub-heading",
    );

    // Reset all slides first (remove animation class)
    swiperInstance.slides.forEach((slide) => {
      slide
        .querySelectorAll("h1, p, .btn, .sub-heading")
        .forEach((el) => el.classList.remove("animate-in"));
    });

    // Add animation class to active slide elements
    elementsToAnimate.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-in");
      }, 200 * index); // Staggered animation
    });
  }
});
