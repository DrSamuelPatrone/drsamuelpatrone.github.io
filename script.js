/* ============================================
   Samuel Patrone - Website Interactions
   Particles, scroll reveals, navigation
   ============================================ */

// --- Particles.js Configuration ---
// Inspired by Feynman diagrams: vertices (particles) connected by propagators (lines)
document.addEventListener('DOMContentLoaded', function () {

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 70,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ['#4fc3f7', '#7c4dff', '#ffffff', '#b388ff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.45,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.6,
                        opacity_min: 0.15,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5,
                        size_min: 0.8,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: '#4fc3f7',
                    opacity: 0.12,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // --- Scroll Reveal ---
    var reveals = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
        revealObserver.observe(el);
    });

    // --- Navbar scroll effect ---
    var navbar = document.getElementById('navbar');
    var heroSection = document.getElementById('hero');

    function updateNav() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // --- Active nav link tracking ---
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a');

    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navAnchors.forEach(function (a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // --- Mobile nav toggle ---
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // --- Stat counter animation ---
    var stats = document.querySelectorAll('.stat-number');

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function (stat) {
        statsObserver.observe(stat);
    });

    // --- Lightbox for timeline media (images + video) ---
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        var lbImg = document.getElementById('lightboxImg');
        var lbVideo = document.getElementById('lightboxVideo');
        var lbCaption = document.getElementById('lightboxCaption');
        var lbClose = document.getElementById('lightboxClose');

        function showLightbox(caption) {
            lbCaption.textContent = caption || '';
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function openImage(img) {
            lbVideo.pause();
            lbVideo.hidden = true;
            lbImg.hidden = false;
            lbImg.src = img.currentSrc || img.src;
            lbImg.alt = img.alt;
            showLightbox(img.alt);
        }

        function openVideo(caption) {
            lbImg.hidden = true;
            lbImg.removeAttribute('src');
            lbVideo.hidden = false;
            showLightbox(caption);
            lbVideo.currentTime = 0;
            var p = lbVideo.play();
            if (p && typeof p.catch === 'function') p.catch(function () {});
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            lbVideo.pause();
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.timeline-media img').forEach(function (img) {
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.addEventListener('click', function () {
                openImage(img);
            });
            img.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openImage(img);
                }
            });
        });

        document.querySelectorAll('.timeline-media video').forEach(function (video) {
            video.setAttribute('tabindex', '0');
            video.setAttribute('role', 'button');
            var fig = video.closest('figure');
            var cap = fig && fig.querySelector('figcaption');
            var capText = cap ? cap.textContent.trim() : '';
            video.addEventListener('click', function () {
                openVideo(capText);
            });
            video.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVideo(capText);
                }
            });
        });

        lbClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    function animateCounter(el) {
        var text = el.textContent.trim();
        var suffix = text.replace(/[0-9]/g, '');
        var target = parseInt(text, 10);
        if (isNaN(target)) return;

        var duration = 1200;
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        el.textContent = '0' + suffix;
        requestAnimationFrame(step);
    }
});
