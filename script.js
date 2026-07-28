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

        function openVideo(video, caption) {
            lbImg.hidden = true;
            lbImg.removeAttribute('src');
            lbVideo.hidden = false;
            // Mirror the clicked video's sources so the lightbox plays the right clip.
            while (lbVideo.firstChild) lbVideo.removeChild(lbVideo.firstChild);
            video.querySelectorAll('source').forEach(function (src) {
                lbVideo.appendChild(src.cloneNode(true));
            });
            lbVideo.load();
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
                openVideo(video, capText);
            });
            video.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVideo(video, capText);
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

    // --- Quotes Carousel ---
    var carousel = document.querySelector('.quotes-carousel');
    if (carousel) {
        var track = carousel.querySelector('.carousel-track');
        var slides = carousel.querySelectorAll('.carousel-slide');
        var prevBtn = carousel.querySelector('.carousel-btn--prev');
        var nextBtn = carousel.querySelector('.carousel-btn--next');
        var current = 0;

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
        }

        prevBtn.addEventListener('click', function () { goTo(current - 1); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); });

        // Swipe support
        var startX = 0;
        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        carousel.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
        }, { passive: true });
    }

    // --- Publications 3D Carousel ---
    var pubCarousel = document.querySelector('.pub-carousel');
    if (pubCarousel) {
        var stage = pubCarousel.querySelector('.pub-stage');
        var cards = Array.prototype.slice.call(stage.querySelectorAll('.pub-card'));
        var dotsWrap = document.querySelector('.pub-dots');
        var pubIndex = 0;
        var activeBase = '';

        // Position/scale/opacity keyed by distance from the active card
        var DEPTH = [
            { x: 0, z: 0, ry: 0, s: 1, o: 1, zi: 30 },
            { x: 58, z: -170, ry: 28, s: 0.88, o: 0.32, zi: 20 },
            { x: 76, z: -330, ry: 34, s: 0.78, o: 0, zi: 10 }
        ];

        // Shortest signed distance from the active card, so the deck wraps
        function offsetOf(i) {
            var n = cards.length;
            var off = i - pubIndex;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            return off;
        }

        function transformFor(off) {
            var d = DEPTH[Math.min(Math.abs(off), DEPTH.length - 1)];
            var dir = off < 0 ? -1 : 1;
            return 'translateX(-50%)' +
                ' translateX(' + (dir * d.x) + '%)' +
                ' translateZ(' + d.z + 'px)' +
                ' rotateY(' + (-dir * d.ry) + 'deg)' +
                ' scale(' + d.s + ')';
        }

        function renderPubs() {
            cards.forEach(function (card, i) {
                var off = offsetOf(i);
                var d = DEPTH[Math.min(Math.abs(off), DEPTH.length - 1)];
                var active = off === 0;

                card.style.transform = transformFor(off);
                card.style.opacity = d.o;
                card.style.zIndex = d.zi;
                card.classList.toggle('is-active', active);
                card.classList.remove('is-tilting');
                card.setAttribute('aria-hidden', active ? 'false' : 'true');

                // Keep links on hidden cards out of the tab order
                Array.prototype.forEach.call(card.querySelectorAll('a'), function (link) {
                    link.tabIndex = active ? 0 : -1;
                });
            });

            activeBase = transformFor(0);

            Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
                dot.classList.toggle('is-active', i === pubIndex);
                dot.setAttribute('aria-current', i === pubIndex ? 'true' : 'false');
            });
        }

        function goToPub(index) {
            pubIndex = (index + cards.length) % cards.length;
            renderPubs();
        }

        // Cards are absolutely positioned, so the stage needs an explicit
        // height. Measure the tallest card at the current width rather than
        // trusting a fixed value that clips once the text rewraps.
        function sizeStage() {
            var tallest = 0;
            cards.forEach(function (card) {
                card.style.height = 'auto';
                tallest = Math.max(tallest, card.offsetHeight);
                card.style.height = '';
            });
            stage.style.height = tallest + 'px';
        }

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(sizeStage, 150);
        });

        // Dots
        cards.forEach(function (card, i) {
            var dot = document.createElement('button');
            dot.className = 'pub-dot';
            dot.type = 'button';
            var heading = card.querySelector('h3');
            dot.setAttribute('aria-label', heading ? heading.textContent.trim() : 'Paper ' + (i + 1));
            dot.addEventListener('click', function () { goToPub(i); });
            dotsWrap.appendChild(dot);
        });

        pubCarousel.querySelector('.carousel-btn--prev')
            .addEventListener('click', function () { goToPub(pubIndex - 1); });
        pubCarousel.querySelector('.carousel-btn--next')
            .addEventListener('click', function () { goToPub(pubIndex + 1); });

        // Clicking a card in the wings brings it to the front
        cards.forEach(function (card, i) {
            card.addEventListener('click', function () {
                if (offsetOf(i) !== 0) goToPub(i);
            });
        });

        pubCarousel.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { goToPub(pubIndex - 1); }
            else if (e.key === 'ArrowRight') { goToPub(pubIndex + 1); }
        });

        // Swipe
        var pubStartX = 0;
        pubCarousel.addEventListener('touchstart', function (e) {
            pubStartX = e.touches[0].clientX;
        }, { passive: true });
        pubCarousel.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - pubStartX;
            if (Math.abs(dx) > 40) goToPub(pubIndex + (dx < 0 ? 1 : -1));
        }, { passive: true });

        // Pointer-tracked tilt on the front card, for mice only
        var canTilt = window.matchMedia('(hover: hover)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (canTilt) {
            var tiltQueued = false;
            var tiltX = 0;
            var tiltY = 0;

            stage.addEventListener('pointermove', function (e) {
                var rect = stage.getBoundingClientRect();
                tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                tiltX = -((e.clientY - rect.top) / rect.height - 0.5) * 8;
                if (tiltQueued) return;
                tiltQueued = true;
                requestAnimationFrame(function () {
                    tiltQueued = false;
                    var card = cards[pubIndex];
                    card.classList.add('is-tilting');
                    card.style.transform = activeBase +
                        ' rotateX(' + tiltX.toFixed(2) + 'deg)' +
                        ' rotateY(' + tiltY.toFixed(2) + 'deg)';
                });
            });

            stage.addEventListener('pointerleave', function () {
                var card = cards[pubIndex];
                card.classList.remove('is-tilting');
                card.style.transform = activeBase;
            });
        }

        sizeStage();
        renderPubs();

        // Font swap can rewrap the text after first paint
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(sizeStage);
        }
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
