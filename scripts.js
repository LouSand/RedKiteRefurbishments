// =====================
// MENU
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const dropdown = document.getElementById("dropdownMenu");

  if (menuBtn && dropdown) {
    function closeMenu() {
      dropdown.classList.remove("open");
      dropdown.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      dropdown.setAttribute("aria-hidden", String(!isOpen));
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", closeMenu);

    dropdown.addEventListener("click", (e) => {
      if (e.target.tagName === "A") closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // =====================
  // SLIDESHOWS (SLOW + FADE)
  // =====================
  const slideshows = {
    kitchens: [
      "/RedKiteRefurbishments/images/example_images/kitchen_birch_plywood.png",
      "/RedKiteRefurbishments/images/example_images/hidden_kitchen_birch_plywood.png",
      "/RedKiteRefurbishments/images/example_images/kitchen_breakfast_bar.jpeg",
      "/RedKiteRefurbishments/images/example_images/carrara_marble_veinmatched_island.jpeg"
    ],
    bathrooms: [
      "/RedKiteRefurbishments/images/example_images/bathroom_bath_slate_tiles.jpeg",
      "/RedKiteRefurbishments/images/example_images/bathroom_black_slate_flooring.jpeg",
      "/RedKiteRefurbishments/images/example_images/bathroom_sink_slate_tiles.jpeg",
      "/RedKiteRefurbishments/images/example_images/bathroom_sink_toilet.jpeg",
      "/RedKiteRefurbishments/images/example_images/bathroom&flooring.jpeg"
    ],
    garage: [
      "/RedKiteRefurbishments/images/example_images/extention_front_glass_door.jpeg",
      "/RedKiteRefurbishments/images/example_images/extention_glass.jpeg"
    ],
    composite: [
      "/RedKiteRefurbishments/images/example_images/oak_doors.jpeg"
    ],
    plumbing: [
      "/RedKiteRefurbishments/images/example_images/bathroom_sink_toilet.jpeg",
      "/RedKiteRefurbishments/images/example_images/bathroom_sink_slate_tiles.jpeg"
    ],
    electrical: [
      "/RedKiteRefurbishments/images/example_images/light_box_display.jpeg",
      "/RedKiteRefurbishments/images/example_images/showroom.jpeg"
    ],
    joinery: [
      "/RedKiteRefurbishments/images/example_images/custom_floating_bed_landscape.jpeg",
      "/RedKiteRefurbishments/images/example_images/murphy_bed.png",
      "/RedKiteRefurbishments/images/example_images/reception_desk.jpeg",
      "/RedKiteRefurbishments/images/example_images/bar_with_trim.jpeg"
    ],
    flooring: [
      "/RedKiteRefurbishments/images/example_images/lvt_flooring_wooden.jpeg",
      "/RedKiteRefurbishments/images/example_images/lvt_flooring.jpeg",
      "/RedKiteRefurbishments/images/example_images/flooring_edges.jpeg",
      "/RedKiteRefurbishments/images/example_images/wood_LVT_flooring.jpeg"
    ]
  };

  function startSlideshow(key, imgId, intervalMs = 8000, fadeMs = 900) {
    const img = document.getElementById(imgId);
    const list = slideshows[key];

    if (!img || !list || list.length <= 1) return;

    let i = 0;

    // optional: pre-load images so fades feel smooth
    list.forEach((src) => {
      const pre = new Image();
      pre.src = src;
    });

    setInterval(() => {
      img.classList.add("is-fading");

      setTimeout(() => {
        i = (i + 1) % list.length;
        img.src = list[i];

        requestAnimationFrame(() => {
          img.classList.remove("is-fading");
        });
      }, fadeMs);
    }, intervalMs);
  }

  startSlideshow("kitchens", "slideshow-kitchens");
  startSlideshow("bathrooms", "slideshow-bathrooms");
  startSlideshow("garage", "slideshow-garage");
  startSlideshow("composite", "slideshow-composite");
  startSlideshow("plumbing", "slideshow-plumbing");
  startSlideshow("electrical", "slideshow-electrical");
  startSlideshow("joinery", "slideshow-joinery");
  startSlideshow("flooring", "slideshow-flooring");
});


// =====================
// GALLERY LIGHTBOX (with next/prev)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (!lightbox || !lightboxImg) return;

  const imgs = Array.from(document.querySelectorAll(".lightbox-img"));
  if (imgs.length === 0) return;

  const btnPrev = lightbox.querySelector(".lightbox-nav.prev");
  const btnNext = lightbox.querySelector(".lightbox-nav.next");
  const btnClose = lightbox.querySelector(".lightbox-close");

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + imgs.length) % imgs.length; // wrap around
    const img = imgs[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
  }

  function openAt(index) {
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // stop background scrolling
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function next() { show(currentIndex + 1); }
  function prev() { show(currentIndex - 1); }

  // open on image click
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".lightbox-img");
    if (!img) return;

    const index = imgs.indexOf(img);
    if (index >= 0) openAt(index);
  });

  // buttons
  if (btnNext) btnNext.addEventListener("click", (e) => { e.stopPropagation(); next(); });
  if (btnPrev) btnPrev.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  if (btnClose) btnClose.addEventListener("click", (e) => { e.stopPropagation(); close(); });

  // click backdrop to close (but not when clicking image/buttons)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
});
