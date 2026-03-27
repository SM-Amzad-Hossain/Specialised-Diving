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
    autoplay: {
      delay: 5000,
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
  });
});
