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
  const slideshowImages = {

    kitchens: [
      "images/example_images/kitchen_quartz_work_surfaces_all.jpeg",
      "images/example_images/kitchen_island.jpeg",
      "images/example_images/kitchen_quartz_work_surfaces.jpeg",
      "images/example_images/kitchen_quartz_work_surfaces_breakfast_bar.jpeg",
      "images/example_images/kitchen_quartz_work_surfaces_undermounted_sink.jpeg",
      "images/example_images/kitchen_quartz_work_surfaces_undermounted_sink2.jpeg",
      "images/example_images/hidden_kitchen_birch_plywood.png",
      "images/example_images/kitchen_birch_plywood.png",
      "images/example_images/kitchen_birch_plywood_cupboard.png",
      "images/example_images/kitchen_breakfast_bar.jpeg",
      "images/example_images/kitchen_side.jpeg"
    ],

    bathrooms: [
      "images/example_images/bathroom_bath_slate_tiles.jpeg",
      "images/example_images/bathroom_black_slate_flooring.jpeg",
      "images/example_images/bathroom_sink_slate_tiles.jpeg",
      "images/example_images/bathroom_sink_toilet.jpeg",
      "images/example_images/bathroom&flooring.jpeg"
    ],

    garage: [
      "images/example_images/sectional_door.jpeg",
      "images/example_images/sectional_door_green.jpeg",
      "images/example_images/side_hinge_door.jpeg",
      "images/example_images/side_hinge_door_white.jpeg",
      "images/example_images/roller_door.jpeg",
      "images/example_images/roller_door_agate_grey.jpeg",
      "images/example_images/roller_door_chartwell_green.jpeg",
      "images/example_images/roller_door_white.jpeg",
      "images/example_images/upnover_door_anthracite.jpeg",
      "images/example_images/upnover_door.jpeg",
      "images/example_images/personnel_door.jpeg"
    ],

    composite: [
      "images/example_images/composite_door_black.jpeg",
      "images/example_images/composite_door_chartwell_green.jpeg",
      "images/example_images/composite_door_french_grey.jpeg"
    ],

    plumbing: [
      "images/example_images/bathroom_sink_toilet.jpeg"
    ],

    electrical: [
      "images/example_images/showroom_lighting1.jpeg",
      "images/example_images/showroom_lighting.jpeg",
      "images/example_images/lighting_display_colour_daylight.jpeg",
      "images/example_images/light_box_display.jpeg",
      "images/example_images/light_box_display_blue_orange.jpeg",
      "images/example_images/light_box_display_pink_green.jpeg",
      "images/example_images/light_box_display_purple_blue.jpeg",
      "images/example_images/light_box_display_orange_blue.jpeg",
      "images/example_images/pendant_light.jpeg"
    ],

    joinery: [
      "images/example_images/murphy_bed_project/WhatsApp Image 2026-03-09 at 17.21.19 (4).jpeg",
      "images/example_images/murphy_bed_project/WhatsApp Image 2026-03-09 at 17.21.08.jpeg",
      "images/example_images/murphy_bed_project/WhatsApp Image 2026-03-09 at 17.21.19.jpeg",
      "images/example_images/custom_floating_bed_landscape.jpeg",
      "images/example_images/custom_floating_bed_profile.jpeg",
      "images/example_images/bar_with_trim.jpeg",
      "images/example_images/reception_desk.jpeg"
    ],

    flooring: [
      "images/example_images/lvt_flooring_wooden.jpeg",
      "images/example_images/lvt_flooring.jpeg",
      "images/example_images/wood_LVT_flooring.jpeg",
      "images/example_images/flooring_edges.jpeg"
    ]
  };

  function startSlideshow(key, imgId, intervalMs = 8000, fadeMs = 900) {
    const img = document.getElementById(imgId);
    const list = slideshowImages[key];

    if (!img || !list || list.length <= 1) return;

    let i = 0;

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
// GALLERY LIGHTBOX
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
    currentIndex = (index + imgs.length) % imgs.length;
    const img = imgs[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
  }

  function openAt(index) {
    show(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function next() { show(currentIndex + 1); }
  function prev() { show(currentIndex - 1); }

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".lightbox-img");
    if (!img) return;

    const index = imgs.indexOf(img);
    if (index >= 0) openAt(index);
  });

  if (btnNext) btnNext.addEventListener("click", (e) => { e.stopPropagation(); next(); });
  if (btnPrev) btnPrev.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
  if (btnClose) btnClose.addEventListener("click", (e) => { e.stopPropagation(); close(); });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const MIN_SWIPE_DISTANCE = 50;
  const MAX_VERTICAL_DRIFT = 80;

  lightbox.addEventListener("touchstart", (e) => {
    if (!lightbox.classList.contains("open")) return;
    const t = e.changedTouches[0];
    touchStartX = t.screenX;
    touchStartY = t.screenY;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    if (!lightbox.classList.contains("open")) return;
    const t = e.changedTouches[0];
    touchEndX = t.screenX;
    touchEndY = t.screenY;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    if (Math.abs(dy) > MAX_VERTICAL_DRIFT) return;

    if (Math.abs(dx) >= MIN_SWIPE_DISTANCE) {
      if (dx < 0) next();
      else prev();
    }
  }, { passive: true });
});