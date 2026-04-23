document.addEventListener('DOMContentLoaded', function () {

    // ─── Theme Toggle ──────────────────────────────────────────────────────────
    var themeToggle = document.getElementById('theme-toggle');

    function updateThemeIcon(theme) {
        var icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    updateThemeIcon(document.documentElement.getAttribute('data-theme'));

    themeToggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    // ─── Hamburger Menu ────────────────────────────────────────────────────────
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // ─── Smooth Scrolling ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Scroll Progress Bar ───────────────────────────────────────────────────
    var scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    // ─── Active Nav Link ───────────────────────────────────────────────────────
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('nav .nav-links a');

    function updateActiveNav() {
        var current = '';
        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    // ─── Back-to-Top Button ────────────────────────────────────────────────────
    var backToTop = document.getElementById('back-to-top');

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function updateBackToTop() {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }

    // ─── Scroll Event (passive for performance) ────────────────────────────────
    window.addEventListener('scroll', function () {
        updateScrollProgress();
        updateActiveNav();
        updateBackToTop();
    }, { passive: true });

    // Initialise on load
    updateScrollProgress();
    updateActiveNav();
    updateBackToTop();

    // ─── GitHub Avatar ────────────────────────────────────────────────────────
    var avatarEl = document.querySelector('.hero-avatar');

    fetch('https://api.github.com/users/CaboFernando')
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data && data.avatar_url) {
                var img = document.createElement('img');
                img.src = data.avatar_url;
                img.alt = 'Carlos Fernando dos Santos';
                img.addEventListener('load', function () {
                    avatarEl.textContent = '';
                    avatarEl.appendChild(img);
                });
            }
        })
        .catch(function () { /* keep initials on error */ });

    // ─── Scroll Reveal (Intersection Observer) ────────────────────────────────
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

});
