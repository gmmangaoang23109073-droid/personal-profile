document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE TOGGLE =====
  const toggleBtn = document.getElementById("darkModeToggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("darkMode", "disabled");
        toggleBtn.textContent = "🌙";
      }
    });
  }

  // ===== HIGHLIGHT ACTIVE NAV LINK (FIXED) =====
  // Get the current page filename (e.g., "about.html", "index.html")
  let currentPath = window.location.pathname;
  let currentFile = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  // If URL ends with "/" (homepage), treat it as index.html
  if (!currentFile || currentFile === "") {
    currentFile = "index.html";
  }

  // Remove any query parameters (e.g., ?v=1)
  currentFile = currentFile.split("?")[0];

  // Loop through all nav links and add the "active" class to the matching one
  document.querySelectorAll("nav a").forEach((link) => {
    let href = link.getAttribute("href");

    // Extract just the filename from the href (ignores ./ , ../ , folders)
    let hrefFile = href.substring(href.lastIndexOf("/") + 1);
    hrefFile = hrefFile.split("?")[0]; // Remove query params

    // If the filenames match exactly, highlight this link
    if (hrefFile === currentFile) {
      link.classList.add("active");
    }
  });
});