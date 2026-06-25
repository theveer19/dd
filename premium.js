        /* ============================================================
        PREMIUM.JS — New sections animations
        Loaded after script.js
        ============================================================ */

        (function () {
            'use strict';

            /* ── 1. LENIS SMOOTH SCROLL ─────────────────────────────── */
            let lenis;

            function initLenis() {
                if (typeof Lenis === 'undefined') return;

                lenis = new Lenis({
                    duration: 0.45,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    direction: 'vertical',
                    smooth: true,
                    smoothTouch: false,
                });

                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);

                // Sync with GSAP ScrollTrigger
                if (typeof ScrollTrigger !== 'undefined') {
                    lenis.on('scroll', ScrollTrigger.update);
                    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
                    gsap.ticker.lagSmoothing(0);
                }
            }

            /* ── 2. CUSTOM CURSOR ───────────────────────────────────── */
            function initCursor() {
                const dot  = document.getElementById('cursorDot');
                const ring = document.getElementById('cursorRing');
                if (!dot || !ring) return;

                let mx = -100, my = -100;
                let rx = -100, ry = -100;

                document.addEventListener('mousemove', (e) => {
                    mx = e.clientX; my = e.clientY;
                    dot.style.left = mx + 'px';
                    dot.style.top  = my + 'px';
                });

                // Ring follows with lag
                (function animateRing() {
                    rx += (mx - rx) * 0.12;
                    ry += (my - ry) * 0.12;
                    ring.style.left = rx + 'px';
                    ring.style.top  = ry + 'px';
                    requestAnimationFrame(animateRing);
                })();

                // Hover state on interactive elements
                const hoverEls = document.querySelectorAll('a, button, .og-item-inner, .dropdown-category');
                hoverEls.forEach(el => {
                    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
                    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
                });
            }

            /* ── 3. AMBIENT PARTICLES ───────────────────────────────── */
            function initParticles() {
                const canvas = document.getElementById('particleCanvas');
                if (!canvas) return;
                const ctx = canvas.getContext('2d');

                canvas.width  = window.innerWidth;
                canvas.height = window.innerHeight;

                const particles = [];
                const COUNT = 45;
                const COLORS = ['rgba(249,196,168,', 'rgba(221,214,243,', 'rgba(197,216,232,', 'rgba(245,237,214,'];

                for (let i = 0; i < COUNT; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        r: Math.random() * 2 + 0.3,
                        vx: (Math.random() - 0.5) * 0.18,
                        vy: (Math.random() - 0.5) * 0.18,
                        color: COLORS[Math.floor(Math.random() * COLORS.length)],
                        alpha: Math.random() * 0.5 + 0.1,
                    });
                }

                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.forEach(p => {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fillStyle = p.color + p.alpha + ')';
                        ctx.fill();

                        p.x += p.vx;
                        p.y += p.vy;

                        if (p.x < 0) p.x = canvas.width;
                        if (p.x > canvas.width) p.x = 0;
                        if (p.y < 0) p.y = canvas.height;
                        if (p.y > canvas.height) p.y = 0;
                    });
                    requestAnimationFrame(draw);
                }
                draw();

                window.addEventListener('resize', () => {
                    canvas.width  = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            }

            /* ── 4. GSAP SECTION 02 — SCROLL CHARACTER ──────────────── */
            function initScrollChar() {
                if (typeof gsap === 'undefined') return;
                gsap.registerPlugin(ScrollTrigger);

                const png     = document.getElementById('charPng');
                const shadow  = document.getElementById('charShadow');
                const section = document.getElementById('section02');
                const bg2     = document.querySelector('.char-bg-2');
                const bg3     = document.querySelector('.char-bg-3');
                const bar     = document.getElementById('scrollProgressBar');
                if (!png || !section) return;

                /* Scroll velocity tracker */
                let lastScroll = 0;
                let velocity = 0;
                let velRaf;

                function trackVelocity() {
                    const current = window.scrollY;
                    velocity = (current - lastScroll) * 0.1;
                    lastScroll = current;
                    velRaf = requestAnimationFrame(trackVelocity);
                }
                trackVelocity();

                /* Progress bar */
                if (bar) {
                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top top',
                        end: 'bottom bottom',
                        onUpdate: (self) => {
                            bar.style.width = (self.progress * 100) + '%';
                        }
                    });
                }

                gsap.to(png, {
            y: 500,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2.5,
            }
        });




                /* Shadow moves/shrinks with scroll */
                if (shadow) {
                    gsap.to(shadow, {
                        scaleX: 0.6,
                        opacity: 0.3,
                        y: 30,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top center',
                            end: 'bottom center',
                            scrub: 3,
                        }
                    });
                }

                /* Parallax layers at different speeds */
                if (bg2) {
                    gsap.to(bg2, {
                        y: -60,
                        ease: 'none',
                        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 }
                    });
                }
                if (bg3) {
                    gsap.to(bg3, {
                        y: -120,
                        ease: 'none',
                        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
                    });
                }

                /* Velocity-based extra wobble applied via rAF */
            
                /* Text reveals */
                const textRevealEls = section.querySelectorAll('[data-reveal]');
                textRevealEls.forEach((el, i) => {
                    gsap.fromTo(el,
                        { opacity: 0, y: 36 },
                        {
                            opacity: 1, y: 0,
                            duration: 1,
                            ease: 'power3.out',
                            delay: i * 0.12,
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 88%',
                                once: true,
                            }
                        }
                    );
                });

                /* Heading character stagger using SplitText if available */
                const heading = section.querySelector('.char-heading');
                if (heading) {
                    if (typeof SplitText !== 'undefined') {
                        const split = new SplitText(heading, { type: 'words,chars' });
                        gsap.from(split.chars, {
                            opacity: 0,
                            y: 30,
                            rotateX: -30,
                            stagger: 0.025,
                            duration: 0.8,
                            ease: 'back.out(2)',
                            scrollTrigger: {
                                trigger: heading,
                                start: 'top 85%',
                                once: true,
                            }
                        });
                    } else {
                        heading.classList.add('is-revealed');
                    }
                }
            }

            /* ── 5. SECTION 03 — ORBITAL GALLERY ────────────────────── */
            function initOrbitalGallery() {
                const stage   = document.getElementById('ogStage');
                const items   = document.querySelectorAll('.og-orbit-item');
                const section = document.getElementById('section03');
                if (!stage || items.length === 0) return;

                const ORBIT_RADIUS = 420;
                const COUNT = items.length;
                let orbitAngle = 0;
                let orbitSpeed = 0.003;
                let targetSpeed = 0.003;
                let mouseX = 0, mouseY = 0;
                let stageCX = 0, stageCY = 0;

                // Float offset per item
                const floatOffsets = Array.from({ length: COUNT }, (_, i) => i * (Math.PI * 2 / COUNT));
                const floatTime = { t: 0 };

               function positionItems(angle) {
    items.forEach((item, i) => {

        const theta = angle + (i * (Math.PI * 2 / COUNT));

        const x = Math.cos(theta) * ORBIT_RADIUS;
        const y = Math.sin(theta) * ORBIT_RADIUS * 0.45;

        const floatY = Math.sin(floatTime.t + floatOffsets[i]) * 8;

        // Product tilts only ±50°
        const tilt = Math.sin(theta) * 10;

        item.style.transform =
            `translate(${x}px, ${y + floatY}px)
             rotate(${tilt}deg)`;
    });
}

                // Track mouse to slightly affect orbit direction
                if (section) {
                    const rect = stage.getBoundingClientRect();
                    stageCX = rect.left + rect.width / 2;
                    stageCY = rect.top + rect.height / 2;

                    section.addEventListener('mousemove', (e) => {
                        mouseX = (e.clientX - stageCX) / (window.innerWidth / 2);
                        mouseY = (e.clientY - stageCY) / (window.innerHeight / 2);
                        targetSpeed = 0.003 + mouseX * 0.002;
                    });
                    section.addEventListener('mouseleave', () => {
                        targetSpeed = 0.003;
                    });
                }

                // Hover: slow orbit
                items.forEach(item => {
                    const inner = item.querySelector('.og-item-inner');
                    if (inner) {
                        inner.addEventListener('mouseenter', () => { targetSpeed = 0.001; });
                        inner.addEventListener('mouseleave', () => { targetSpeed = 0.003; });
                    }
                });

                function animateOrbit() {
                    orbitSpeed += (targetSpeed - orbitSpeed) * 0.05;
                    orbitAngle += orbitSpeed;
                    floatTime.t += 0.018;
                    positionItems(orbitAngle);
                    requestAnimationFrame(animateOrbit);
                }
                animateOrbit();

                /* Section reveal with GSAP */
                if (typeof gsap !== 'undefined') {
                    const ogHeader  = section.querySelector('.og-header');
                    const ogFooter  = section.querySelector('.og-footer');

                    if (ogHeader) {
                        const heading = ogHeader.querySelector('.og-heading');
                        const eyebrow = ogHeader.querySelector('.og-eyebrow');
                        const sub     = ogHeader.querySelector('.og-sub');

                        if (eyebrow) gsap.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ogHeader, start: 'top 85%', once: true } });
                        if (heading && typeof SplitText !== 'undefined') {
                            const split = new SplitText(heading, { type: 'words' });
                            gsap.from(split.words, {
                                opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power3.out',
                                scrollTrigger: { trigger: heading, start: 'top 85%', once: true }
                            });
                        } else if (heading) {
                            gsap.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 85%', once: true } });
                        }
                        if (sub) gsap.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3, scrollTrigger: { trigger: sub, start: 'top 88%', once: true } });
                    }

                    // Orbit items entrance
                    gsap.fromTo(stage,
                        { opacity: 0, scale: 0.85 },
                        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: { trigger: stage, start: 'top 80%', once: true }
                        }
                    );

                    if (ogFooter) {
                        gsap.fromTo(ogFooter, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ogFooter, start: 'top 90%', once: true } });
                    }
                }
            }

            /* ── 6. FOOTER REVEAL ANIMATIONS ────────────────────────── */
            function initFooter() {
                const footer = document.getElementById('footerSection');
                if (!footer || typeof gsap === 'undefined') return;

                const brand   = footer.querySelector('.fc-brand-giant');
                const tagline = footer.querySelector('.fc-tagline');

                if (brand) {
                    gsap.fromTo(brand,
                        { opacity: 0, y: 60 },
                        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out',
                        scrollTrigger: { trigger: brand, start: 'top 88%', once: true }
                        }
                    );
                }
                if (tagline) {
                    gsap.fromTo(tagline,
                        { opacity: 0, x: -30 },
                        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3,
                        scrollTrigger: { trigger: tagline, start: 'top 90%', once: true }
                        }
                    );
                }

                const revealEls = footer.querySelectorAll('[data-reveal]');
                revealEls.forEach((el, i) => {
                    gsap.fromTo(el,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
                        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
                        }
                    );
                });

                /* Social link magnetic hover */
                const socialLinks = footer.querySelectorAll('.fc-social-link');
                socialLinks.forEach(link => {
                    link.addEventListener('mousemove', (e) => {
                        const rect = link.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
                        link.style.transform = `scale(1.12) translate(${x}px, ${y}px)`;
                    });
                    link.addEventListener('mouseleave', () => {
                        link.style.transform = '';
                    });
                });

                /* Newsletter submit */
                const nlBtn = footer.querySelector('.fc-nl-btn');
                const nlInput = footer.querySelector('.fc-nl-input');
                if (nlBtn && nlInput) {
                    nlBtn.addEventListener('click', () => {
                        if (nlInput.value.includes('@')) {
                            nlInput.style.opacity = '0.3';
                            setTimeout(() => {
                                nlInput.value = '';
                                nlInput.placeholder = 'You\'re in. ✓';
                                nlInput.style.opacity = '1';
                            }, 300);
                        }
                    });
                }
            }

            /* ── 7. GENERIC SCROLL REVEAL (fallback for non-GSAP) ────── */
            function initScrollReveal() {
                const revealEls = document.querySelectorAll('[data-reveal]');
                if (!revealEls.length) return;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-revealed');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12 });

                revealEls.forEach(el => observer.observe(el));
            }

            /* ── 8. BUTTON LIQUID HOVER ─────────────────────────────── */
            function initLiquidButtons() {
                const btns = document.querySelectorAll('.btn-ghost-luxury, .btn-luxury-full, .btn-primary');
                btns.forEach(btn => {
                    btn.addEventListener('mousemove', (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        btn.style.setProperty('--mx', x + '%');
                        btn.style.setProperty('--my', y + '%');
                    });
                });
            }

            /* ── INIT ALL ───────────────────────────────────────────── */
            document.addEventListener('DOMContentLoaded', () => {
                initLenis();
                initCursor();
                initParticles();
                initScrollReveal();
                initLiquidButtons();
                initScrollChar();
                initOrbitalGallery();
                initFooter();
            });

        })();