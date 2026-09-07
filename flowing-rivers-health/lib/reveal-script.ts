/**
 * Inline script that powers <Reveal>. Runs once the document has parsed,
 * before React hydrates, so off-screen elements are hidden before they are
 * ever painted. Kept dependency-free and tiny on purpose.
 */
export const revealScript = `
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i], el = e.target;
      if (e.isIntersecting) {
        if (el.classList.contains("reveal-pending")) {
          el.classList.remove("reveal-pending");
          el.classList.add("reveal-in");
        }
        io.unobserve(el);
      } else {
        el.classList.add("reveal-pending");
      }
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
  var els = document.querySelectorAll("[data-reveal]");
  for (var j = 0; j < els.length; j++) io.observe(els[j]);
})();
`;
