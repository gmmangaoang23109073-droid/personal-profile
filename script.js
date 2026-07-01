document.addEventListener("DOMContentLoaded", () => {
    // ===== DARK MODE TOGGLE =====
    const toggleBtn = document.getElementById("darkModeToggle");
    const DARK_MODE_KEY = "darkMode";

    // Initialize dark mode
    const isDarkMode = localStorage.getItem(DARK_MODE_KEY) === "enabled";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isNowDark = document.body.classList.toggle("dark-mode");
            
            localStorage.setItem(DARK_MODE_KEY, isNowDark ? "enabled" : "disabled");
            toggleBtn.textContent = isNowDark ? "☀️" : "🌙";
            
            // Optional: Dispatch custom event for other scripts
            document.dispatchEvent(new CustomEvent('darkModeToggled', { 
                detail: { isDark: isNowDark } 
            }));
        });
    }

    // ===== HIGHLIGHT ACTIVE NAV LINK (IMPROVED) =====
    highlightActiveNavLink();

    // ===== ADDITIONAL FEATURES =====
    
    // 1. Mobile hamburger menu (if you have one)
    setupMobileMenu();

    // 2. Smooth scroll for anchor links
    setupSmoothScroll();

    // 3. Add timestamp to footer (optional)
    updateFooterYear();
});

// ===== NAVIGATION HIGHLIGHTING (EXTRACTED) =====
function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    let currentFile = currentPath.substring(currentPath.lastIndexOf("/") + 1);

    // Handle root/homepage
    if (!currentFile || currentFile === "") {
        currentFile = "index.html";
    }

    // Remove query parameters and hash
    currentFile = currentFile.split("?")[0].split("#")[0];

    // Get all nav links
    const navLinks = document.querySelectorAll("nav a");
    
    if (navLinks.length === 0) return;

    // Find matching link
    let matchedLink = null;

    navLinks.forEach((link) => {
        let href = link.getAttribute("href");
        if (!href) return;

        // Extract filename from href
        let hrefFile = href.substring(href.lastIndexOf("/") + 1);
        hrefFile = hrefFile.split("?")[0].split("#")[0];

        // Handle relative paths (./, ../)
        if (hrefFile === "" && href.endsWith("/")) {
            hrefFile = "index.html";
        }

        // Exact match
        if (hrefFile === currentFile) {
            matchedLink = link;
        }
    });

    // If no exact match, try partial match (for dynamic routes)
    if (!matchedLink) {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href && currentPath.includes(href.replace(/^\.\//, ""))) {
                matchedLink = link;
            }
        });
    }

    // Remove active from all, add to matched
    navLinks.forEach(link => link.classList.remove("active"));
    if (matchedLink) {
        matchedLink.classList.add("active");
    }
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const hamburger = document.getElementById("hamburgerMenu");
    const navMenu = document.querySelector("nav ul") || document.querySelector("nav");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            hamburger.classList.toggle("active");
            
            // Toggle aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains("show");
            hamburger.setAttribute("aria-expanded", isExpanded);
        });

        // Close menu on link click (mobile)
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu on outside click
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    }
}

// ===== SMOOTH SCROLL =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===== FOOTER YEAR =====
function updateFooterYear() {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== OPTIONAL: PREFERS COLOR SCHEME =====
function detectSystemTheme() {
    // Check if user prefers dark mode and no preference saved
    if (!localStorage.getItem("darkMode")) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
            document.body.classList.add("dark-mode");
            const toggleBtn = document.getElementById("darkModeToggle");
            if (toggleBtn) toggleBtn.textContent = "☀️";
            localStorage.setItem("darkMode", "enabled");
        }
    }
}

// Run system theme detection (optional)
// detectSystemTheme();