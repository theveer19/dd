/* about.js */

gsap.registerPlugin(ScrollTrigger);

// Only run heavy animations on non-reduced-motion users
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
    gsap.from('.hero-left', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-product', {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.5
    });

    gsap.utils.toArray('.story-card').forEach(function(card, i) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
            },
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12
        });
    });

    gsap.from('.mission-card', {
        scrollTrigger: {
            trigger: '.mission-section',
            start: 'top 82%',
        },
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.18
    });

    gsap.from('.tech-product', {
        scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 82%',
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.tech-right', {
        scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 82%',
        },
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.about-cta h2', {
        scrollTrigger: {
            trigger: '.about-cta',
            start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.cta-btn', {
        scrollTrigger: {
            trigger: '.about-cta',
            start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
    });
}