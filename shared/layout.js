// Injects the shared header/nav into every page at runtime.
// Include with a relative path, e.g. <script src="shared/layout.js" defer></script>
// from the homepage, or <script src="../../shared/layout.js" defer></script> from
// a page in pages/<name>/. The relative path itself tells this script how deep
// the current page is nested, so it can build correct relative links from there.
(function () {
  const scriptSrc = document.currentScript.getAttribute("src");
  const root = scriptSrc.replace(/shared\/layout\.js$/, "");
  const homeHref = root || "./";

  fetch(root + "pages.json")
    .then((r) => r.json())
    .then((pages) => {
      const header = document.createElement("header");
      header.innerHTML = `
        <h1><a href="${homeHref}">Vibe Coding Workshop</a></h1>
        <nav>
          <ul>
            <li><a href="${homeHref}">Home</a></li>
            ${pages.map((p) => `<li><a href="${root}pages/${p.name}/">${p.title}</a></li>`).join("")}
          </ul>
        </nav>
      `;
      document.body.prepend(header);
    });
})();
