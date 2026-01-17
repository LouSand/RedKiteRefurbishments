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
