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
  const loadHeaderFooter = async () => {
    await loadComponent("./components/header.html", "header-placeholder");
    await loadComponent("./components/footer.html", "footer-placeholder");

    // Initialize Scroll Effect for Header after loading
    initHeaderScroll();
    // Initialize Scroll Reveal for all sections
    initScrollReveal();
  };

  loadHeaderFooter();

  function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  function initScrollReveal() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });
  }

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

  // Initialize Testimonials Swiper
  const testimonialsSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoHeight: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
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
