/* ============================================================
   ORBIT + NAVBAR SCROLL
   ============================================================ */
window.addEventListener('scroll', () => {
    const pivot = document.getElementById('orbitPivot');
    const innerItems = document.querySelectorAll('.item-inner');

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / maxScroll;

    const startAngle = -45;
    const endAngle = -150;
    const currentAngle = startAngle + (scrollPercent * (endAngle - startAngle));

    pivot.style.transform = `translateY(-50%) rotate(${currentAngle}deg)`;

    innerItems.forEach((item, index) => {
        const angleOnWheel = currentAngle + (index * 40);
        const proximity = Math.abs(angleOnWheel);
        const focusFactor = Math.max(0, (1 - proximity / 35));
        const scalePop = 1 + (focusFactor * 0.12);
        const readabilityFix = focusFactor * -currentAngle * 0.2;
        item.style.transform = `scale(${scalePop}) rotate(${readabilityFix}deg)`;
        const img = item.querySelector('.floating-img');
        img.style.filter = `drop-shadow(0 20px 50px rgba(255,255,255,${0.3 + focusFactor * 0.3}))`;
    });
});

/* ============================================================
   NAVBAR SHRINK
   ============================================================ */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(0, 0, 0, 0.2)";
        nav.style.height = "70px";
    } else {
        nav.style.background = "rgba(255, 255, 255, 0.03)";
        nav.style.height = "80px";
    }
});

/* ============================================================
   SECTION 02 — ENGINEERING SCROLL SYSTEM
   ============================================================ */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const section = document.querySelector('.one-t-engineering');
    const modelLayer = document.querySelector('.model-layer');
    const modelViewer = document.getElementById('oneTModel');
    const sText = document.getElementById('scrollText');

    if (section && modelLayer && modelViewer && sText) {
        const sectionOffset = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        const progress = Math.max(0, Math.min(1, (scrollY - sectionOffset) / (sectionHeight - windowHeight)));

        const moveDown = progress * 600;
        modelLayer.style.transform = `translateY(${moveDown}px)`;

        modelViewer.setAttribute('camera-orbit', `${progress * 720}deg 75deg 105%`);

        sText.style.transform = `translateX(${(progress - 0.5) * -40}vw)`;

        const cards = document.querySelectorAll('.info-card');
        const thresholds = [0.1, 0.4, 0.7];
        cards.forEach((card, index) => {
            if (progress > thresholds[index] && progress < thresholds[index] + 0.25) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Animate spec bars and panels in/out based on progress
        const leftPanel = document.querySelector('.eng-left-panel');
        const rightPanel = document.querySelector('.eng-right-panel');
        if (leftPanel && rightPanel) {
            const panelOpacity = Math.min(1, progress * 5);
            leftPanel.style.opacity = panelOpacity;
            rightPanel.style.opacity = panelOpacity;
        }
    }
});

/* ============================================================
   SECTION 03 — MESH GRADIENT PARALLAX
   ============================================================ */
document.addEventListener('mousemove', (e) => {
    const mesh = document.querySelector('.mesh-gradient-bg');
    if (!mesh) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    mesh.style.background = `
        radial-gradient(circle at ${80 + (x / 20)}% ${20 + (y / 20)}%, var(--coral-accent) 0%, transparent 40%),
        radial-gradient(circle at ${10 - (x / 20)}% ${80 - (y / 20)}%, var(--deep-clay) 0%, transparent 35%)
    `;
});

/* ============================================================
   COUNTER ANIMATION — STAT CARDS
   ============================================================ */
function animateCount(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.round(start);
        if (start >= target) clearInterval(timer);
    }, 16);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countEls = entry.target.querySelectorAll('.count');
            countEls.forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                animateCount(el, target, 1200);
            });
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const engSection = document.querySelector('.one-t-engineering');
if (engSection) countObserver.observe(engSection);

/* ============================================================
   SPEC ROWS — SCROLL-TRIGGERED REVEAL
   ============================================================ */
const specObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.spec-row, .stat-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    specObserver.observe(el);
});

/* ============================================================
   LIFESTYLE CHIP TOGGLE
   ============================================================ */
document.querySelectorAll('.ls-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.ls-chip').forEach(c => c.classList.remove('active-chip'));
        chip.classList.add('active-chip');
    });
});

/* ============================================================
   PARALLAX SCROLL — LIFESTYLE CARDS
   ============================================================ */
window.addEventListener('scroll', () => {
    const lifestyle = document.querySelector('.onet-lifestyle');
    if (!lifestyle) return;

    const rect = lifestyle.getBoundingClientRect();
    const progress = 1 - (rect.bottom / (window.innerHeight + rect.height));

    const editorialHeading = document.querySelector('.editorial-heading');
    if (editorialHeading) {
        editorialHeading.style.transform = `translateY(${progress * -30}px)`;
    }

    const floatingChips = document.querySelectorAll('.f-chip');
    floatingChips.forEach((chip, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        chip.style.transform = `translateY(${progress * direction * 20 - 5}px)`;
    });
});

/* ============================================================
   FOOTER — SCROLL REVEAL
   ============================================================ */
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer-logo-block, .footer-col, .footer-right-block').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`;
    footerObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-logo-block, .footer-col, .footer-right-block').forEach(el => io.observe(el));
});